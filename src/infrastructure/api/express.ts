import express, { Express } from 'express';
import { Sequelize } from 'sequelize-typescript';
import CustomerModel from '../customer/repostitory/sequelize/customer.model';
import { customerRouter } from './routes/customer.route';

export const app: Express = express();
app.use(express.json());
app.use("/customer", customerRouter);

export let sequilize: Sequelize;

async function setupDb() {
  sequilize = new Sequelize({
    dialect: 'sqlite',
    storage: ':memory:',
    logging: false,
  });
  await sequilize.addModels([CustomerModel]);
  await sequilize.sync();
}

setupDb();