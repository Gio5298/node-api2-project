const express = require('express');

const info = require('./data/db.js');

const server = express();



const port = 7000;
server.listen(port, () => console.log(`\n ** api on port: ${port} ** \n`));