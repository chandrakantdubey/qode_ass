import XLSX from 'xlsx';
import fs from 'fs';
import path from 'path';

const file = 'public/React Assignment Historical NAV Report.xlsx';
const outputFile = 'src/data/portfolioData.json';

const workbook = XLSX.readFile(file);
const sheetName = workbook.SheetNames[0];
const sheet = workbook.Sheets[sheetName];
const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1, defval: '' });

// Data starts from row 6 (index 5), headers are at row 5 (index 4)
// But let's look at the output from inspect:
// [ 'NAV Date', 'NAV (Rs)' ] is at index 4.
// Data starts at index 5.

const rawData = jsonData.slice(5);
const parsedData = [];

// Helper to parse date
function parseDate(dateStr) {
    // If it's a number (Excel serial date), convert it
    if (typeof dateStr === 'number') {
        return new Date(Math.round((dateStr - 25569) * 86400 * 1000));
    }
    // If string, assume DD-MMM-YYYY or DD-MM-YYYY
    // Example: 24-05-2015
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
            date: parseDate(dateStr).toISOString().split('T')[0], // YYYY-MM-DD
            nav: nav
        });
    }
});

// Sort by date ascending
parsedData.sort((a, b) => new Date(a.date) - new Date(b.date));

// Calculate Drawdown
let peak = -Infinity;
parsedData.forEach(d => {
    if (d.nav > peak) peak = d.nav;
    d.drawdown = ((d.nav - peak) / peak) * 100;
});

// Calculate Month-on-Month Returns
// Group by Year-Month
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

    // Return = (End NAV - Start NAV) / Start NAV ? No, usually it's based on previous month end.
    // But for the first month, maybe (End - Start) / Start.
    // Let's use (End of this month - End of previous month) / End of previous month.

    let returnValue = 0;
    if (index > 0) {
        const prevKey = keys[index - 1];
        const prevMonth = monthlyData[prevKey];
        returnValue = ((currentMonth.end - prevMonth.end) / prevMonth.end) * 100;
    } else {
        // First month: (End - Start) / Start
        returnValue = ((currentMonth.end - currentMonth.start) / currentMonth.start) * 100;
    }

    monthlyReturns.push({
        year: parseInt(year),
        month: parseInt(month), // 1-12
        return: parseFloat(returnValue.toFixed(2))
    });
});

// Structure for the table: { year: { month: return } }
const returnsTable = {};
monthlyReturns.forEach(r => {
    if (!returnsTable[r.year]) returnsTable[r.year] = {};
    returnsTable[r.year][r.month] = r.return;
});

// Calculate YTD (Year to Date)
Object.keys(returnsTable).forEach(year => {
    // YTD is geometric linking of returns? Or just sum?
    // Usually geometric: (1 + r1)(1 + r2)... - 1
    // Let's calculate geometric YTD.
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
