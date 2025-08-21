const XLSX = require("xlsx");

const parseExcel = (filepath) => {
  const workBook = XLSX.readFile(filepath);
  const sheetName = workBook.SheetNames[0];
  return XLSX.utils.sheet_to_json(workBook.Sheets[sheetName]).map((row) => ({
    firstname: row.firstname,
    mobile: row.mobile,
    note: row.note,
  }));
};

module.exports = parseExcel ; 