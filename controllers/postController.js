const { validationResult } = require('express-validator');

// Bring in Model
const User = require('../models/User');
const Profile = require('../models/Profile');
const Post = require('../models/Post');

//  @route  GET api/posts
//  @desc   Get all Posts
//  @access Private

exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 });

    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({
      success: false,
      error: 'Server Error',
    });
  }
};

//  @route  GET api/posts/:id
//  @desc   Get Posts by ID
//  @access Private

exports.getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(400).json({ msg: 'Post not found' });
    }

    res.status(200).json(post);
  } catch (err) {
    if (err.kind == 'ObjectId') {
      return res.status(400).json({ msg: 'Post not found' });
    }

    res.status(400).json({ error: err.message });
  }
};

//  @route  POST api/posts
//  @desc   Create new Post
//  @access Private

exports.addPost = async (req, res) => {
  // Get Errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const user = await User.findById(req.user.id).select('-password');

    const newPost = {
      user: req.user.id,
      text: req.body.text,
      name: user.name,
      avatar: user.avatar,
    };

    // Create Post
    const post = await Post.create(newPost);
    return res.status(201).json(post);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

//  @route  DELETE api/posts/:id
//  @desc   Delete Post
//  @access Private

exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    // Check if Post exists
    if (!post) return res.status(400).json({ msg: 'Post not found' });

    // Check auth
    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    await post.remove();

    res.status(200).json({ msg: 'Post deleted' });
  } catch (err) {
    if (err.kind == 'ObjectId') {
      return res.status(400).json({ msg: 'Post not found' });
    }
    res.status(400).json({ error: err.message });
  }
};

//  @route  PUT api/posts/like/:id
//  @desc   Like a post
//  @access Private

exports.likePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    // Check User
    const checkLike =
      post.likes.filter(like => like.user.toString() === req.user.id).length >
      0;
    if (checkLike) {
      return res.status(400).json({ msg: 'Post already liked' });
    }

    post.likes.unshift({ user: req.user.id });

    await post.save();
    res.status(200).json(post.likes);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

//  @route  PUT api/posts/unlike/:id
//  @desc   Unlike a post
//  @access Private

exports.unlikePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    // Check User
    const checkUnlike =
      post.likes.filter(like => like.user.toString() === req.user.id).length ===
      0;
    if (checkUnlike) {
      return res.status(400).json({ msg: 'Post has not yet been liked' });
    }

    // Get index
    const removeIndex = post.likes
      .map(like => like.user.toString())
      .indexOf(req.user.id);

    post.likes.splice(removeIndex, 1);
    await post.save();

    res.status(200).json(post.likes);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

//  @route  POST api/posts/comment/:id
//  @desc   Create new Comment
//  @access Private

exports.addComment = async (req, res) => {
  // Get Errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const post = await Post.findById(req.params.id);
    const user = await User.findById(req.user.id).select('-password');

    const newComment = {
      user: req.user.id,
      text: req.body.text,
      name: user.name,
      avatar: user.avatar,
    };

    // Create Comment
    post.comments.unshift(newComment);
    await post.save();
    res.status(201).json(post.comments);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

//  @route  DELETE api/posts/comment/:id/:comment_id
//  @desc   Delete Comment
//  @access Private

exports.deleteComment = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    const comment = post.comments.find(
      comment => comment._id.toString() === req.params.comment_id
    );

    if (!comment) {
      return res.status(404).json({ msg: 'Comment does not exist' });
    }

    if (comment.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    // Get index
    const removeIndex = post.comments
      .map(comment => comment.user.toString())
      .indexOf(req.user.id);

    post.comments.splice(removeIndex, 1);
    await post.save();

    res.status(200).json(post.comments);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
