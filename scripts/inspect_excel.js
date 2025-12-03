import XLSX from 'xlsx';
import fs from 'fs';

const file = 'public/React Assignment Historical NAV Report.xlsx';
const workbook = XLSX.readFile(file);

console.log('Sheet Names:', workbook.SheetNames);

workbook.SheetNames.forEach(sheetName => {
    const sheet = workbook.Sheets[sheetName];
    const json = XLSX.utils.sheet_to_json(sheet, { header: 1, defval: '' });
    console.log(`\n--- Sheet: ${sheetName} ---`);
    console.log('First 5 rows:');
    console.log(json.slice(0, 5));
});
