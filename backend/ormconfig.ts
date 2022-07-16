import dotenv from 'dotenv';
import * as path from 'path';
dotenv.config();

export = {
  "type": "postgres",
  host: process.env.PGHOST,
  port: process.env.PGPORT,
  username: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
  synchronize: false,
  "migrations": [
    path.resolve(__dirname, 'src', 'database', 'migrations', '**/*.{.ts,.js}')
  ],
  "entities": [
    path.resolve(__dirname, 'src', 'models', '**/*.{.ts,.js}')
  ],
  "cli": {
    "migrationsDir": path.resolve(__dirname, 'src', 'database', 'migrations', '**/*.{.ts,.js}')
  }
}