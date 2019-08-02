const express = require('express');
const userRouter = require('./users/userRouter');
const postRouter = require('./posts/postRouter');

const server = express();

server.use(logger);
server.use(express.json());
server.use('/api/users', userRouter);
server.use('/api/posts', postRouter);

server.get('/', (req, res) => {
  res.status(200).send(`<h2>API for WebAPI Challenge 3+4</h2>`)
});

//custom middleware

function logger(req, res, next) {
  let date = new Date;
  console.log(`method: ${req.method}`, `url: http:localhost:3000${req.url}`, `timestamp: ${date}`);
  next();
};

module.exports = server;
