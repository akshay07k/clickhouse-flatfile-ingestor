import createClickHouseClient from '../models/clickhouseClient.js';

export async function attachClickHouse(req, res, next) {
  if (req.session?.connectionConfig) {
    
    req.clickhouse = await createClickHouseClient(req.session.connectionConfig);
    next();
  } else {
    res.status(400).json({ error: 'No ClickHouse connection configuration found. Please connect first.' });
  }
}
