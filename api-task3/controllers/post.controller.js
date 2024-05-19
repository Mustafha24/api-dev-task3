import Post from '../models/post.model.js';
import { verifyToken } from '../utils/auth.js';

export const createPost = async (req, res) => {
  const { content } = req.body;
  const { id } = req.user; 

  try {
    const newPost = await Post.create({ user: id, content });
    res.status(201).json({ success: true, post: newPost });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
export const getPostById = async (req, res) => {
  const { postId } = req.params;

  try {
    const post = await Post.findById(postId).populate('user', 'name email');
    if (!post) {
      return res.status(404).json({ success: false, message: 'Post not found' });
    }
    res.status(200).json({ success: true, post });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const updatePost = async (req, res) => {
  const { postId } = req.params;
  const { content } = req.body;

  try {
    const updatedPost = await Post.findByIdAndUpdate(postId, { content }, { new: true });
    if (!updatedPost) {
      return res.status(404).json({ success: false, message: 'Post not found' });
    }
    res.status(200).json({ success: true, post: updatedPost });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const deletePost = async (req, res) => {
  const { postId } = req.params;

  try {
    const deletedPost = await Post.findByIdAndDelete(postId);
    if (!deletedPost) {
      return res.status(404).json({ success: false, message: 'Post not found' });
    }
    res.status(200).json({ success: true, message: 'Post deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
export const likePost = async (req, res) => {
  const { postId } = req.params;
  const { id } = req.user; 
  try {
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ success: false, message: 'Post not found' });
    }
    if (post.likes.includes(id)) {
      return res.status(400).json({ success: false, message: 'You already liked this post' });
    }
    post.likes.push(id);
    await post.save();
    res.status(200).json({ success: true, message: 'Post liked successfully', post });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const addComment = async (req, res) => {
  const { postId } = req.params;
  const { text } = req.body;
  const { id } = req.user; 

  try {
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ success: false, message: 'Post not found' });
    }
    const newComment = { user: id, text };
    post.comments.push(newComment);
    await post.save();
    res.status(201).json({ success: true, message: 'Comment added successfully', post });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};