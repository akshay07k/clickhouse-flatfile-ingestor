import { ClickHouse } from 'clickhouse';
import config from '../config/config.js';

const clickhouse = new ClickHouse({
  url: config.clickhouse.host,
  port: config.clickhouse.port,
  debug: false,
  basicAuth: {
    username: config.clickhouse.username,
    password: config.clickhouse.password,
  },
  isUseGzip: false,
  format: "json",
  config: {
    database: config.clickhouse.database,
  }
});

export default clickhouse;
