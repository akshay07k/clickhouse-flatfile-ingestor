import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import session from 'express-session';

const app = express();

app.use(session({
  secret: 'asdf1234',
  resave: false,
  saveUninitialized: false,
  cookie: { 
    secure: false,
    httpOnly: true,
    sameSite: 'lax'
  }
}));


// For __dirname equivalent in ES6 modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


app.use(cors({
  origin: "http://localhost:5173",
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
app.use('/api/flatfile', fileRoutes); 
app.use('/api/ingest', ingestionRoutes);

// Serve static files if needed (e.g. for download folder)
app.use('/data', express.static(path.join(__dirname, 'data')));



export default app;