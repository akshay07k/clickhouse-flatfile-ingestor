import { Router } from 'express';
import { upload } from '../middlewares/multer.js';
import { ingestCSV } from '../controllers/fileController.js';
import { attachClickHouse } from '../middlewares/attachClickHouse.js';

const router = Router();
router.use(attachClickHouse);

// Endpoint to upload and ingest a CSV file
router.post('/upload', upload.single('csvFile'), ingestCSV);

export default router;
