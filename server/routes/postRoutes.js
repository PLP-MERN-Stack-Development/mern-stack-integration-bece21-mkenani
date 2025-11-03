const express = require('express');
const {
  getPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
  addComment,
  toggleLike,
} = require('../controllers/postController');
const auth = require('../middleware/auth');

const router = express.Router();

router.route('/')
  .get(getPosts)
  .post(auth, createPost);

router.route('/:id')
  .get(getPost)
  .put(auth, updatePost)
  .delete(auth, deletePost);

router.post('/:id/comments', auth, addComment);
router.put('/:id/like', auth, toggleLike);

module.exports = router;