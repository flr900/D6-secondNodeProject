import { createConnection, ConnectionOptions } from 'typeorm';

createConnection(<ConnectionOptions>{
  type: 'postgres',
  url: process.env.DATABASE_URL,
  entities: ['./src/models/*.ts'],
  migrations: ['./src/database/migrations/*.ts'],
  cli: {
    migrationsDir: './src/database/migrations',
  },
}).catch(error => console.log(error));
