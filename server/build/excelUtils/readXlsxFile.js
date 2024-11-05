"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.readXlsxFile = readXlsxFile;
var xlsx = require('xlsx');
function readXlsxFile(filePath) {
    var workbook = xlsx.readFile(filePath);
    var sheetName = 'expeditii';
    if (workbook.SheetNames.includes(sheetName)) {
        var worksheet = workbook.Sheets[sheetName];
        var sheetData = xlsx.utils.sheet_to_json(worksheet, { header: 1 });
        return sheetData;
    }
    return null;
}
