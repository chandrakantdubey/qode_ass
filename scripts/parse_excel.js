import XLSX from 'xlsx';
import fs from 'fs';
import path from 'path';

const file = 'public/React Assignment Historical NAV Report.xlsx';
const outputFile = 'src/data/portfolioData.json';

const workbook = XLSX.readFile(file);
const sheetName = workbook.SheetNames[0];
const sheet = workbook.Sheets[sheetName];
const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1, defval: '' });

const rawData = jsonData.slice(5);
const parsedData = [];

function parseDate(dateStr) {
    if (typeof dateStr === 'number') {
        return new Date(Math.round((dateStr - 25569) * 86400 * 1000));
    }
    const parts = dateStr.split('-');
    if (parts.length === 3) {
        return new Date(`${parts[2]}-${parts[1]}-${parts[0]}`);
    }
    return new Date(dateStr);
}

rawData.forEach(row => {
    const dateStr = row[0];
    const nav = parseFloat(row[1]);

    if (dateStr && !isNaN(nav)) {
        parsedData.push({
            date: parseDate(dateStr).toISOString().split('T')[0],
            nav: nav
        });
    }
});

parsedData.sort((a, b) => new Date(a.date) - new Date(b.date));

let peak = -Infinity;
parsedData.forEach(d => {
    if (d.nav > peak) peak = d.nav;
    d.drawdown = ((d.nav - peak) / peak) * 100;
});

const monthlyData = {};
parsedData.forEach(d => {
    const date = new Date(d.date);
    const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
    if (!monthlyData[key]) {
        monthlyData[key] = { start: d.nav, end: d.nav, startDate: d.date, endDate: d.date };
    } else {
        monthlyData[key].end = d.nav;
        monthlyData[key].endDate = d.date;
    }
});

const monthlyReturns = [];
const years = new Set();

Object.keys(monthlyData).sort().forEach((key, index, keys) => {
    const currentMonth = monthlyData[key];
    const [year, month] = key.split('-');
    years.add(year);

    let returnValue = 0;
    if (index > 0) {
        const prevKey = keys[index - 1];
        const prevMonth = monthlyData[prevKey];
        returnValue = ((currentMonth.end - prevMonth.end) / prevMonth.end) * 100;
    } else {
        returnValue = ((currentMonth.end - currentMonth.start) / currentMonth.start) * 100;
    }

    monthlyReturns.push({
        year: parseInt(year),
        month: parseInt(month),
        return: parseFloat(returnValue.toFixed(2))
    });
});

const returnsTable = {};
monthlyReturns.forEach(r => {
    if (!returnsTable[r.year]) returnsTable[r.year] = {};
    returnsTable[r.year][r.month] = r.return;
});

Object.keys(returnsTable).forEach(year => {
    let ytd = 1;
    Object.values(returnsTable[year]).forEach(r => {
        ytd *= (1 + r / 100);
    });
    returnsTable[year]['YTD'] = parseFloat(((ytd - 1) * 100).toFixed(2));
});

const finalData = {
    equityCurve: parsedData,
    monthlyReturns: returnsTable
};

fs.writeFileSync(outputFile, JSON.stringify(finalData, null, 2));
console.log('Data parsed and saved to', outputFile);
