const express = require('express');

const server = express();

server.use(logger);

server.get('/', (req, res) => {
  res.status(200).send(`<h2>Let's write some middleware!</h2>`)
});

//custom middleware

function logger(req, res, next) {
  let date = new Date;
  console.log(`method: ${req.method}`, `url: http:localhost:3000${req.url}`, `timestamp: ${date}`);
  next();
};

module.exports = server;
