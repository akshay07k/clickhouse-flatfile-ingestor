import clickhouse from '../models/clickhouseClient.js';
import { parseCSVFile } from '../models/fileProcessor.js';
import fs from 'fs';
import path from 'path';

/** 
 *  - Ingests a CSV file into a ClickHouse table.
 *  - Validates the uploaded file and target table name.
 *  - Parses the CSV using parseCSVFile (should return an array of objects).
 *  - Validates that all rows conform to the same schema.
 *  - Uses bulk insertion with JSONEachRow format to safely insert data.
 *  - Cleans up the uploaded file from disk after processing.
 */

export async function ingestCSV(req, res) {
  try {
    // Check that a file was uploaded via multer
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }
    const filePath = req.file.path;
    
    // Parse CSV file into an array of objects
    const rows = await parseCSVFile(filePath);
    if (!rows || rows.length === 0) {
      return res.status(400).json({ error: "Uploaded CSV file is empty or invalid" });
    }
    console.log(rows);
    
    
    // Get target table name from the request body
    const tableName = req.body.tableName;
    if (!tableName || tableName.trim() === "") {
      return res.status(400).json({ error: "Target table name is required" });
    }
    
    // Validate that each row has a consistent schema
    const columns = Object.keys(rows[0]);

    // Validate schema once for all rows
    const isValidSchema = rows.every(row => {
      const keys = Object.keys(row);
      return keys.length === columns.length && keys.every(key => columns.includes(key));
    });

    if (!isValidSchema) {
      return res.status(400).json({ error: "Inconsistent CSV schema across rows" });
    }

    // Efficiently build values using map + join
    const values = rows.map(row => {
      const rowValues = columns.map(col => {
        const val = row[col];
        if (val === null || val === undefined) return 'NULL';
        const escaped = String(val).replace(/'/g, "\\'");
        return `'${escaped}'`;
      });
      return `(${rowValues.join(', ')})`;
    }).join(', ');

    
    // Build the INSERT query 
    const insertQuery = `INSERT INTO ${tableName} (${columns.join(', ')}) VALUES ${values}`;
    
    
    await clickhouse.insert(insertQuery).toPromise();
    
    
    // Cleanup: Remove the uploaded CSV from disk
    fs.unlink(filePath, (err) => {
      if (err) console.error("Error deleting uploaded file:", err.message);
    });
    
    res.json({ message: "Data ingested successfully", insertedRows: rows.length });
    
  } catch (err) {
    // On error, ensure the uploaded file is cleaned up
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlink(req.file.path, (unlinkErr) => {
        if (unlinkErr) console.error("Error deleting file on failure:", unlinkErr.message);
      });
    }
    res.status(500).json({ error: err.message });
  }
}
