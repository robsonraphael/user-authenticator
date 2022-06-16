import * as express from "express";
import * as cors from "cors";
import * as logger from "morgan";

import { AppDataSource } from "./config/data-source";
import { authRouter } from './routes/auth';

export const app = express();

app.use(cors());
app.use(express.json());
app.use(logger("dev"));

// Connect MongoDB

AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized !");
  })
  .catch((error) => {
    console.error("Error during Data Source initialization", error);
  });

app.use('/auth', authRouter)