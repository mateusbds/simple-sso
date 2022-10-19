import { DataSource } from 'typeorm';

export const connectionSource = new DataSource({
  type: 'postgres',
  host: 'db',
  port: 5432,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: ['src/infra/database/typeorm/entities/**/*.ts'],
  migrations: ['database/migrations/**/*.ts'],
  subscribers: ['src/infra/database/typeorm/subscribers/**/*.ts'],
});
