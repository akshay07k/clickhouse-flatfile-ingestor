import { Router } from 'express';
import { 
    getTables, 
    getTableSchema, 
    exportTableToCSV, 
    exportSelectedColumnsToCSV, 
    exportJoinResult, 
    previewTable
} from '../controllers/clickhouseController.js';
import authenticate from '../middlewares/auth.js';

const router = Router();

router.get('/tables', authenticate, getTables);
router.get('/tables/:table', authenticate, getTableSchema);
router.get('/tables/:table/preview', authenticate, previewTable);
router.get('/tables/:table/export', authenticate, exportTableToCSV);
router.get('/tables/:table/export/columns', authenticate, exportSelectedColumnsToCSV);
router.post('/join/export', authenticate, exportJoinResult);


export default router;
