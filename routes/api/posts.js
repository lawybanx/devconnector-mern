const express = require('express');
const router = express.Router();
const {
  addPost,
  getPosts,
  getPostById,
  deletePost,
  likePost,
  unlikePost,
  addComment,
  deleteComment,
} = require('../../controllers/postController');
const auth = require('../../middleware/auth');
const { check } = require('express-validator');

// Get Posts, Add new Post
router
  .route('/')
  .get(auth, getPosts)
  .post(check('text', 'Text is required').notEmpty(), auth, addPost);

// Get Post By ID, Delete Post
router.route('/:id').get(auth, getPostById).delete(auth, deletePost);

//Like Post
router.get('/like/:id', auth, likePost);

// Unlike Post
router.get('/unlike/:id', auth, unlikePost);

// Comment Post
router.post(
  '/comment/:id',
  check('text', 'Text is required').notEmpty(),
  auth,
  addComment
);

// Delete Comment
router.delete('/comment/:id/:comment_id', auth, deleteComment);

module.exports = router;
