import bodyParser from 'body-parser';
import express from 'express';
import next from 'next';

import {ApiRouter} from './app/api/index';

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
const port = process.env.PORT || 3000;

(async () => {
  try {
    await app.prepare();
    const server = express();

    server.use(bodyParser.json());
    server.use('/api/v1', ApiRouter());

    /* eslint-disable no-unused-vars */
    server.use(async (err, req, res, next) => {
      const response = {
        code: err.code || 500,
        message: err.message,
        type: err.type
      };

      res.status(response.code).send(response);
    });

    server.all('*', (req, res) => {
      return handle(req, res);
    });

    server.listen(port, (err) => {
      if (err) throw err;
      console.log(`> Ready on localhost:${port} - env ${process.env.NODE_ENV}`);
    });
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
})();