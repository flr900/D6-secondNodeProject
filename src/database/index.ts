import { createConnection, ConnectionOptions } from 'typeorm';
import path from 'path';

const entitiesPath = `${path.resolve(__dirname, '..', 'models')}/*.*`;
const migrationsPath = `${path.resolve('..', 'models')}/*.*`;
console.log(entitiesPath);
createConnection(<ConnectionOptions>{
  type: 'postgres',
  url: process.env.DATABASE_URL,
  entities: [entitiesPath],
  migrations: [migrationsPath],
  cli: {
    migrationsDir: path.resolve(__dirname, 'migrations'),
  },
}).catch(error => console.log(error));
