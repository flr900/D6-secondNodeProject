import { createConnection, ConnectionOptions } from 'typeorm';
import path from 'path';

const entitiesPath = `${path.resolve(__dirname, '..', 'models')}/*.*`;
const migrationsPath = `${path.resolve(__dirname, 'migrations')}/*.*`;
const migrationsDir = `${path.resolve(__dirname, 'migrations')}`;
console.log(migrationsDir);
console.log(entitiesPath);
createConnection();
// createConnection(<ConnectionOptions>{
//   name: 'default',
//   type: 'postgres',
//   entities: [entitiesPath],
//   migrations: [migrationsPath],
//   cli: {
//     migrationsDir: 'src',
//     entitiesDir: 'src',
//   },
//   url: process.env.DATABASE_URL,
// });
