import dotenv from 'dotenv';
import * as path from 'path';
dotenv.config();

export = {
  "type": "postgres",
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
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