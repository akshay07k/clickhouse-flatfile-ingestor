import { ClickHouse } from 'clickhouse';

export default async function createClickHouseClient({ host, port, username, token, database, protocol = 'http' }) {
  // console.log(host, port, username, token, database, protocol);
  
  if (!host || !port || !token || !database) {
    throw new Error('Missing required parameters');
  }


  // Create and return the ClickHouse client
  return new ClickHouse({
    url: `${protocol}://${host}`,
    port,
    debug: false,
    basicAuth: {
      username: username,
    },
    format: "json",
    config: {
      database,
    },
    headers: {
      Authorization: `Bearer ${token}`
    },
  });
}
