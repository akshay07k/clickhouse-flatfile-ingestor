import clickhouse from '../models/clickhouseClient.js';
import { writeDataToCSV } from '../models/fileProcessor.js';

export async function getTables(req, res) {
  try {
    const query = "SHOW TABLES";
    const result = await clickhouse.query(query).toPromise();
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}


export async function getTableSchema(req, res) {
  try {
    
    const { table } = req.params;
    const query = `DESCRIBE TABLE ${table} FORMAT JSON`;
    const result = await clickhouse.query(query).toPromise();
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}


export async function exportTableToCSV(req, res) {
  try {
    const { table } = req.params;
    const query = `SELECT * FROM ${table} FORMAT CSVWithNames`;
    const result = await clickhouse.query(query).toPromise();

    // Save CSV in the ./data folder (make sure this folder exists)
    const outputPath = `./data/${table}.csv`;
    await writeDataToCSV(result, outputPath);
    res.download(outputPath);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}


export async function exportSelectedColumnsToCSV(req, res) {
  try {
    const { table } = req.params;
    const { columns } = req.query; // columns = col1, col2, col3

    if (!columns) {
      return res.status(400).json({ error: 'Columns are required for selective export' });
    }

    const selectedCols = columns.split(',').map(col => col.trim()).join(', ');
    const query = `SELECT ${selectedCols} FROM ${table}`;
    const result = await clickhouse.query(query).toPromise();

    const outputPath = `./data/${table}_selected.csv`;
    await writeDataToCSV(result, outputPath);
    res.download(outputPath);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}


export async function exportJoinResult(req, res) {
  try {
    const { tables, joinKey, columns } = req.body;
    if (!tables || tables.length < 2 || !joinKey || !columns) {
      return res.status(400).json({ error: 'tables, joinKey, and columns are required' });
    }

    const table1 = tables[0];
    const table2 = tables[1];
    const cols = columns.join(', ');

    const query = `
      SELECT ${cols} 
      FROM ${table1} 
      JOIN ${table2} 
      ON ${table1}.${joinKey} = ${table2}.${joinKey}
    `;
    const result = await clickhouse.query(query).toPromise();

    const outputPath = `./data/joined_tables.csv`;
    await writeDataToCSV(result, outputPath);
    res.download(outputPath);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}


export async function previewTable(req, res) {
  try {
    const { table } = req.params;
    const { columns } = req.query;

    const cols = columns ? columns.split(',').map(c => c.trim()).join(', ') : '*';
    const query = `SELECT ${cols} FROM ${table} LIMIT 100`;
    const result = await clickhouse.query(query).toPromise();

    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
