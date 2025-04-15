import express from 'express';
import cors from 'cors';
import config from './config/config.js';
import path from 'path';
import { fileURLToPath } from 'url';

// For __dirname equivalent in ES6 modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(cors({
  origin: process.env.CORS_ORIGIN,
  credentials: true
}));

app.use(express.json({limit: "16kb"}));
app.use(express.urlencoded({
  extended: true,
  limit: "16kb"
}));


import clickhouseRoutes from './routes/clickhouseRoutes.js';
import fileRoutes from './routes/fileRoutes.js';
import ingestionRoutes from './routes/ingestionRoutes.js';

app.use('/api/clickhouse', clickhouseRoutes);
app.use('/api/file', fileRoutes);
app.use('/api/ingest', ingestionRoutes);

// Serve static files if needed (e.g. for download folder)
app.use('/data', express.static(path.join(__dirname, 'data')));



export default app;