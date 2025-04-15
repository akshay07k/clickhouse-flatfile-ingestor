import { exportTableToCSV } from './clickhouseController.js';
import { ingestCSV } from './fileController.js';

export async function ingestData(req, res) {
  const { direction } = req.body;
  if (direction === 'clickhouse-to-file') {
    // Calls the export function – note: this expects req.params.table to be defined
    return exportTableToCSV(req, res);
  } else if (direction === 'file-to-clickhouse') {
    return ingestCSV(req, res);
  } else {
    return res.status(400).json({ error: 'Invalid ingestion direction' });
  }
}
