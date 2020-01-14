const server = require('./api/server')

server.listen(7000, () => { 
  console.log(`\n ** Server running on http://localhost:7000 ** \n`)
});
