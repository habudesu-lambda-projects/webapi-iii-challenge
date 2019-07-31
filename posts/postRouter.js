const express = require('express');
const Post = require('./postDb');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const posts = await Post.get();
    res.status(200).json(posts);
  }
  catch(error) {
    res.status(500).json(error);
  }
});

router.get('/:id', validatePostId, async (req, res) => {
  const { id } = req.params;
  try {
    const post = await Post.getById(id);
    res.status(200).json(post);
  }
  catch(error) {
    res.status(500).json(error);
  }
});

router.delete('/:id', validatePostId, async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await Post.remove(id);
    res.status(200).json({ message: "Post Deleted", post: req.post});
  }
  catch(error) {
    res.status(500).json(error);
  }
});

router.put('/:id', (req, res) => {

});

// custom middleware

async function validatePostId(req, res, next) {
 const { id } = req.params;
 try {
   const post = await Post.getById(id);
   if(post) {
     req.post = post;
     next();
   } else {
     res.status(400).json({ message: "invalid post id" });
   }
 }
 catch(error) {
   res.status(500).json(error);
 }
};

module.exports = router;
