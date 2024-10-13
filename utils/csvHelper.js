const fastCsv = require('fast-csv');
const fs = require('fs');
const csvParser = require('csv-parser');

// Convert array of inventory data to CSV
exports.exportToCSV = (data, filePath) => {
  const ws = fs.createWriteStream(filePath);
  fastCsv
    .write(data, { headers: true })
    .pipe(ws);
};

// Parse CSV file to JSON array
exports.importFromCSV = (filePath) => {
  return new Promise((resolve, reject) => {
    const items = [];
    fs.createReadStream(filePath)
      .pipe(csvParser())
      .on('data', (row) => {
        items.push(row);
      })
      .on('end', () => {
        resolve(items);
      })
      .on('error', (error) => {
        reject(error);
      });
  });
};
