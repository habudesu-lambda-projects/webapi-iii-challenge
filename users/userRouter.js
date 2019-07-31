const express = require('express');

const User = require('./userDb');
const Posts = require('../posts/postDb');

const router = express.Router();

router.post('/', validateUser, async (req, res) => {
  try {
    console.log(req.body);
    const user = await User.insert(req.body);
    res.status(200).json(user);
  }
  catch(error) {
    res.status(500).json(error)
  }
});

router.post('/:id/posts', (req, res) => {

});

router.get('/', async (req, res) => {
  try {
    const users = await User.get();
    res.status(200).json(users);
  }
  catch(error) {
    res.status(500).json(error);
  }
});

router.get('/:id', validateUserId, async (req, res) => {
  res.status(200).json(req.user);
});

router.get('/:id/posts', (req, res) => {

});

router.delete('/:id', (req, res) => {

});

router.put('/:id', (req, res) => {

});

//custom middleware

async function validateUserId(req, res, next) {
  try {
    const { id } = req.params;
    const user = await User.getById(id);
    if(user) {
      req.user = user;
      next();
    } else {
      res.status(404).json({ message: "invalid user id" });
    }
  }
  catch(error) {
    res.status(500).json(error);
  }
};

function validateUser(req, res, next) {
  try {
    const body = req.body;
    if(!body) {
      res.status(400).json({ message: "missing post data" });
    } else if(!body.name) {
      res.status(400).json({ message: "missing required name field" });
    } else {
      next();
    }
  }
  catch(error) {
    res.status(500).json(error);
  }
};

function validatePost(req, res, next) {
 try {
   const body = req.body;
   if(!body) {
     res.status(400).json({ message: "missing post data" });
   } else if(!body.text) {
     res.status(400).json({ message: "missing required text field" });
   } else {
     next();
   }
 }
 catch(error) {
   res.status(500).json(error);
 }
};

module.exports = router;
