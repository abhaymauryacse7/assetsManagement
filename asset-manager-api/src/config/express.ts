import express from 'express';
import * as MySQLConnector from './../api/utils/mysql.connector';
import router from './../api/routes';
import cors from 'cors';

const createServer = (): express.Application => {
  const app = express();
  app.use(cors());

  // create database pool
  MySQLConnector.init();

  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.disable('x-powered-by');

  app.get('/health', (_req, res) => {
    res.send(process.env.APPLICATION_NAME+' is UP');
  });

  app.use('/api', router);

  return app;
};

export { createServer };
