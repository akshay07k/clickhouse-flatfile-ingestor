import fs from 'fs';
import csv from 'fast-csv';
import csvParser from 'csv-parser';

export function writeDataToCSV(data, outputPath) {
  return new Promise((resolve, reject) => {
    const ws = fs.createWriteStream(outputPath);
    csv
      .write(data, { headers: true })
      .pipe(ws)
      .on('finish', () => resolve(outputPath))
      .on('error', err => reject(err));
  });
}

export function parseCSVFile(filePath) {
  return new Promise((resolve, reject) => {
    const results = [];
    fs.createReadStream(filePath)
      .pipe(csvParser())
      .on('data', (data) => results.push(data))
      .on('end', () => resolve(results))
      .on('error', (err) => reject(err));
  });
}
