const express = require('express');
const Post = require('./postDb');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const posts = Post.get();
    res.status(200).json(posts);
  }
  catch(error) {
    res.status(500).json(error);
  }
});

router.get('/:id', (req, res) => {

});

router.delete('/:id', (req, res) => {

});

router.put('/:id', (req, res) => {

});

// custom middleware

async function validatePostId(req, res, next) {
 const { id } = req.params;
 try {
   const post = await Post.getById(id);
   if(post) {
     res.status(200).json(post);
   } else {
     res.status(400).json({ message: "invalid post id" });
   }
 }
 catch(error) {
   res.status(500).json(error);
 }
};

module.exports = router;
