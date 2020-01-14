const express = require('express');

const dbRouter = require('../data/db-router');

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
  res.send(`
    <h2>Lambda Hubs API</h>
    <p>Welcome to the Lambda Hubs API</p>
  `);
});

// requests to routes that begin with /api/hubs
server.use('/api/posts', dbRouter);

module.exports = server;