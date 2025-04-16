import fs from 'fs';
import { writeToStream } from 'fast-csv'; 
import csvParser from 'csv-parser'; 

export function writeDataToCSV(data, outputPath) {
  return new Promise((resolve, reject) => {
    const ws = fs.createWriteStream(outputPath);
    writeToStream(ws, data, { headers: true }) // ✅ use fast-csv writeToStream
      .on('finish', () => resolve(outputPath))
      .on('error', err => reject(err));
  });
}

export function parseCSVFile(filePath) {
  return new Promise((resolve, reject) => {
    const results = [];
    fs.createReadStream(filePath)
      .pipe(
        csvParser({
          mapHeaders: ({ header }) => header.trim(),
          separator: ','
        })
      )
      .on('data', (data) => {
        const trimmedRow = {};
        for (const key in data) {
          trimmedRow[key.trim()] = data[key]?.trim?.() ?? null;
        }
        results.push(trimmedRow);
      })
      .on('end', () => resolve(results))
      .on('error', (err) => reject(err));
  });
}