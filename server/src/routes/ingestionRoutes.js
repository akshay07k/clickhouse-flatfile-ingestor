import { Router } from 'express';
import { ingestData } from '../controllers/ingestionController.js';
import authenticate from '../middlewares/auth.js';

const router = Router();

// This single endpoint handles direction-based ingestion.
router.post('/', authenticate, ingestData);

export default router;
