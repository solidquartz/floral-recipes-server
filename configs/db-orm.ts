import { DataSource } from "typeorm";
import { ArrangedFlower, Arrangement, Flower, Project, Users } from '../db/entities';

const { DB_HOST, DB_USER, DB_PASSWORD, DB_DATABASE, DB_PORT } = process.env;

export const ormDb = new DataSource({
  type: "postgres",
  host: DB_HOST,
  port: Number(DB_PORT ?? 0),
  username: DB_USER,
  password: DB_PASSWORD,
  database: DB_DATABASE,
  entities: [ArrangedFlower, Arrangement, Flower, Project, Users],
  logging: true,
  synchronize: true
})