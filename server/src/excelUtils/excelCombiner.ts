const xlsx = require('xlsx');
const fs = require('fs');
const path = require('path');
const directoryPath = './excelUtils/desfasuratoareSameday';
const readXlsxFile = require('./readXlsxFile');
const now = new Date();
const currentDate = now.toISOString().split('T')[0];
let combinedData: any = [];
let isFirstSheet = true;

function processXlsxFiles() {
  fs.readdir(directoryPath, (err: any, files: any) => {
    if (err) {
      return console.log('Unable to scan directory: ' + err);
    }

    files.forEach((file: any) => {
      if (path.extname(file) === '.xlsx') {
        const filePath = path.join(directoryPath, file);
        const sheetData = readXlsxFile(filePath);
        if (sheetData) {
          if (!isFirstSheet) {
            sheetData.shift();
          } else {
            isFirstSheet = false;
          }
          combinedData = combinedData.concat(sheetData);
        }
      }
    });

    const newWorkbook = xlsx.utils.book_new();
    const newWorksheet = xlsx.utils.aoa_to_sheet(combinedData);
    xlsx.utils.book_append_sheet(newWorkbook, newWorksheet, 'expeditii');
    xlsx.writeFile(
      newWorkbook,
      `desfasuratoare-qualiogama-${currentDate}.xlsx`
    );
    console.log(
      `Combined XLSX file created successfully:desfasuratoare-qualiogama-${currentDate}.xlsx`
    );
    combinedData = [];
  });
}

module.exports = processXlsxFiles;
