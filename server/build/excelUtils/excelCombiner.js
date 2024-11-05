"use strict";
var xlsx = require('xlsx');
var fs = require('fs');
var path = require('path');
var directoryPath = './excelUtils/desfasuratoareSameday';
var readXlsxFile = require('./readXlsxFile');
var now = new Date();
var currentDate = now.toISOString().split('T')[0];
var combinedData = [];
var isFirstSheet = true;
function processXlsxFiles() {
    fs.readdir(directoryPath, function (err, files) {
        if (err) {
            return console.log('Unable to scan directory: ' + err);
        }
        files.forEach(function (file) {
            if (path.extname(file) === '.xlsx') {
                var filePath = path.join(directoryPath, file);
                var sheetData = readXlsxFile(filePath);
                if (sheetData) {
                    if (!isFirstSheet) {
                        sheetData.shift();
                    }
                    else {
                        isFirstSheet = false;
                    }
                    combinedData = combinedData.concat(sheetData);
                }
            }
        });
        var newWorkbook = xlsx.utils.book_new();
        var newWorksheet = xlsx.utils.aoa_to_sheet(combinedData);
        xlsx.utils.book_append_sheet(newWorkbook, newWorksheet, 'expeditii');
        xlsx.writeFile(newWorkbook, "desfasuratoare-qualiogama-".concat(currentDate, ".xlsx"));
        console.log("Combined XLSX file created successfully:desfasuratoare-qualiogama-".concat(currentDate, ".xlsx"));
        combinedData = [];
    });
}
module.exports = processXlsxFiles;
