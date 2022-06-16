import { DataSource } from "typeorm";

const dataBase = "URL_Connect_DB";

export const AppDataSource = new DataSource({
  type: "mongodb",
  url: dataBase,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  port: 27017,
  database: "test",
  entities: [],
  migrations: [],
  subscribers: [],
});
