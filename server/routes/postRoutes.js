import express from 'express';
import { addComment, createPost, deletePost, getPost, getPosts, updatePost } from '../controllers/postController.js';
import auth from '../middleware/auth.js';


const router = express.Router();

router.route('/')
  .get(getPosts)
  .post(auth, createPost);

router.route('/:id')
  .get(getPost)
  .put(auth, updatePost)
  .delete(auth, deletePost);

router.post('/:id/comments', auth, addComment);

export default router;