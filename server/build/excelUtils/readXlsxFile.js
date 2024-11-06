"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.readXlsxFile = readXlsxFile;
const xlsx = require('xlsx');
function readXlsxFile(filePath) {
    const workbook = xlsx.readFile(filePath);
    const sheetName = 'expeditii';
    if (workbook.SheetNames.includes(sheetName)) {
        const worksheet = workbook.Sheets[sheetName];
        const sheetData = xlsx.utils.sheet_to_json(worksheet, { header: 1 });
        return sheetData;
    }
    return null;
}
