// code away!
const server = require('./server.js');

const port = process.env.PORT ? process.env.PORT : 4000;

server.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
