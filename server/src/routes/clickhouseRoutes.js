import { Router } from 'express';
import {
  connect,
  getTables,
  getTableSchema,
  previewTable,
  exportTableToCSV,
  exportJoinResult
} from '../controllers/clickhouseController.js';
import { attachClickHouse } from '../middlewares/attachClickHouse.js';

const router = Router();

// Connection endpoint
router.post('/connect-clickhouse', connect);

// For all subsequent ClickHouse operations, attach the dynamic connection from session.
router.use(attachClickHouse);

router.get('/tables', getTables);
router.get('/tables/:table', getTableSchema);
router.get('/tables/:table/preview', previewTable);
router.get('/tables/:table/export', exportTableToCSV);
router.post('/join/export', exportJoinResult);

export default router;
