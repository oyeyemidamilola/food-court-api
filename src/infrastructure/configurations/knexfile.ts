import type { Knex } from "knex";
import path from 'path';
import { knexSnakeCaseMappers } from "objection";
import { configDotenv } from "dotenv";

configDotenv({ path: path.join(__dirname, '../../../.env') })


const config: { [key: string]: Knex.Config } = {
  development: {
    client: "postgresql",
    connection: {
      database: process.env.POSTGRES_DBNAME,
      user: process.env.POSTGRES_USERNAME,
      password: process.env.POSTGRES_PASSWORD
    },
    pool: {
      min: 2,
      max: 10
    },
    seeds: {
      directory: path.join(__dirname, '..','/data/seeds')
    },
    migrations: {
      directory: path.join(__dirname, '..','/data/migrations'),
      tableName: "knex_migrations"
    },
    ...knexSnakeCaseMappers()
  },
};

export default config
