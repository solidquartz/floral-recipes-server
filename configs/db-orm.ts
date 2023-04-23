import { DataSource, DataSourceOptions } from "typeorm";
import { ArrangedFlower, Arrangement, Flower, Project, Users, FlowerOrders } from '../db/entities';

const { DB_HOST, DB_USER, DB_PASSWORD, DB_DATABASE, DB_PORT } = process.env;

const dataSourceOptions: DataSourceOptions = process.env.NODE_ENV === 'production'
  ? {
    url: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false
    },
    type: "postgres",
    entities: [ArrangedFlower, Arrangement, Flower, Project, Users, FlowerOrders],
    logging: true,
    synchronize: true
  }
  : {
    host: DB_HOST,
    port: Number(DB_PORT ?? 0),
    username: DB_USER,
    password: DB_PASSWORD,
    database: DB_DATABASE,
    type: "postgres",
    entities: [ArrangedFlower, Arrangement, Flower, Project, Users, FlowerOrders],
    logging: true,
    synchronize: true
  };

export const ormDb = new DataSource(dataSourceOptions);
