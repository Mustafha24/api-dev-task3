// routes/post.routes.js
import express from 'express';
import { createPost, getPostById, updatePost, deletePost, likePost, addComment } from '../controllers/post.controller.js';
import authMiddleware from '../middleware/authMiddleware.js';

const postRouter = express.Router();

postRouter.use(authMiddleware);

postRouter.post('/', createPost);
postRouter.get('/:postId', getPostById);
postRouter.put('/:postId', updatePost);
postRouter.delete('/:postId', deletePost);
postRouter.post('/:postId/like', likePost);
postRouter.post('/:postId/comment', addComment);

export default postRouter;
