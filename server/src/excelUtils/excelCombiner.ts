const xlsx = require('xlsx');
const fs = require('fs').promises;
const path = require('path');
const directoryPath = path.join(__dirname, 'desfasuratoareSameday');
const { readXlsxFile } = require('./readXlsxFile');
const now = new Date();
const currentDate = now.toISOString().split('T')[0];

let combinedData: any = [];
let isFirstSheet = true;

async function processXlsxFiles() {
  try {
    const files = await fs.readdir(directoryPath);

    for (const file of files) {
      if (path.extname(file) === '.xlsx') {
        const filePath = path.join(directoryPath, file);
        // console.log(filePath);
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
    }

    const newWorkbook = xlsx.utils.book_new();
    const newWorksheet = xlsx.utils.aoa_to_sheet(combinedData);
    xlsx.utils.book_append_sheet(newWorkbook, newWorksheet, 'expeditii');

    const outputPath = `./excelUtils/desfasuratoare-qualiogama-${currentDate}.xlsx`;
    xlsx.writeFile(
      newWorkbook,
      `desfasuratoare-qualiogama-${currentDate}.xlsx`
    );

    console.log(
      `Combined XLSX file created successfully:desfasuratoare-qualiogama-${currentDate}.xlsx`
    );
    combinedData = [];
    return outputPath;
  } catch (err) {
    console.error('Error processing files:', err);
    throw err;
  }
}

module.exports = processXlsxFiles;
