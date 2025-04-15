export default {
  port: process.env.PORT || 5000,
  clickhouse: {
    host: process.env.CLICKHOUSE_HOST || 'http://localhost',
    port: process.env.CLICKHOUSE_PORT || 8123,  // Adjust to your ClickHouse port
    database: process.env.CLICKHOUSE_DB || 'default',
    username: process.env.CLICKHOUSE_USER || 'default',
    password: process.env.CLICKHOUSE_PASS || '',
  },
  jwtSecret: process.env.JWT_SECRET || 'your_jwt_secret_key_here'
};
