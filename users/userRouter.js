const express = require('express');

const User = require('./userDb');
const Post = require('../posts/postDb');

const router = express.Router();

router.post('/', validateUser, async (req, res) => {
  try {
    const user = await User.insert(req.body);
    res.status(201).json(user);
  }
  catch(error) {
    res.status(500).json(error);
  }
});

router.post('/:id/posts', validateUserId, validatePost, async (req, res) => {
  const { id } = req.params;
  const text = req.body.text;
  try {
    const post = await Post.insert({ text: text, user_id: id});
    res.status(201).json(post);
  }
  catch(error) {
    res.status(500).json(error);
  }
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

router.get('/:id/posts', validateUserId, async (req, res) => {
  try {
    const { id } = req.params;
    const posts = await User.getUserPosts(id);
    res.status(200).json(posts);
  }
  catch(error) {
    res.status(500).json(error);
  }
});

router.delete('/:id', validateUserId, async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await User.remove(id);
    res.status(200).json({ message: "User Deleted", user: req.user});
  }
  catch(error) {
    res.status(500).json(error);
  }
});

router.put('/:id', validateUserId, validateUser, async (req, res) => {
  const { id } = req.params;
  const body = req.body;
  try {
    const updated = await User.update(id, body);
    const updatedUser = await User.getById(id);
    res.status(201).json(updatedUser);
  }
  catch(error) {
    res.status(500).json(error);
  }
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
