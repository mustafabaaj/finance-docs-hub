const xlsx = require('xlsx');

export function readXlsxFile(filePath: any) {
  const workbook = xlsx.readFile(filePath);
  const sheetName = 'expeditii';

  if (workbook.SheetNames.includes(sheetName)) {
    const worksheet = workbook.Sheets[sheetName];
    const sheetData = xlsx.utils.sheet_to_json(worksheet, { header: 1 });
    return sheetData;
  }

  return null;
}
