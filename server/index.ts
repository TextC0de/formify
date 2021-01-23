// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` });

// require('module-alias').addAlias('@app', `${__dirname}/`);
import './mongoose';
import './redis';

import cors from 'cors';
import express from 'express';

import graphql from './graphql';
import authentication from './middleware/autentication';

// import './service/logger';

const app = express();

app.disable('x-powered-by');

app.use('/graphql', express.json(), cors(), authentication, graphql);

app.use('*', (_req, res) => {
    res.status(404).send('404 Not Found');
});

app.listen({ port: process.env.API_PORT }, () => {
    console.log(
        `🚀 Server listening on http://localhost:${process.env.API_PORT}`
    );
    console.log(
        `😷 Health checks available at http://localhost:${process.env.API_PORT}/.well-known/apollo/server-health`
    );
});
