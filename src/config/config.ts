import { registerAs } from '@nestjs/config';

export default registerAs('config', () => {
  return {
    mssql: {
      host: process.env.MSSQL_HOST,
      port: parseInt(process.env.MSSQL_PORT),
      database: process.env.MSSQL_DB,
      username: process.env.MSSQL_USER,
      password: process.env.MSSQL_PASSWORD,
    },
  };
});
