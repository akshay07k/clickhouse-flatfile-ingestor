import { Router } from 'express';
import { upload } from '../middlewares/multer.js';
import { ingestCSV } from '../controllers/fileController.js';
import authenticate from '../middlewares/auth.js';

const router = Router();

// Endpoint to upload and ingest a CSV file
router.post('/upload', authenticate, upload.single('csvFile'), ingestCSV);

export default router;
