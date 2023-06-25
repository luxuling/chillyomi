/* eslint-disable import/no-named-default */
import { default as authRouter } from '@router/auth_router';
import bodyParser from 'body-parser';
import express from 'express';
import http from 'http';
import cors from 'cors';

const createServer = () => {
  const app = express();
  app.use(cors());
  app.use(bodyParser.json());
  app.use(authRouter);
  return new http.Server(app);
};

export default createServer;
