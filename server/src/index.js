import app from './app.js';
import dotenv from 'dotenv';
import config from './config/config.js';

dotenv.config({
  path: "./.env"
})

app.get('/', (req, res) => {
  res.send('ClickHouse FlatFile Ingestor API is running.');
});

// Start the server
app.listen(config.port, () => {
  console.log(`Server is running on port ${config.port}`);
});