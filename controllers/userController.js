const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const gravatar = require('gravatar');

// Bring in Model
const User = require('../models/User');

//  @route  GET api/users
//  @desc   Get All Users
//  @access Public
exports.getUsers = async (req, res, next) => {
  try {
    const users = await User.find();

    return res.status(200).json({
      success: true,
      count: users.length,
      data: users,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: 'Server Error',
    });
  }
};

//  @route  POST api/auth/register
//  @desc   Register new user
//  @access Public

exports.registerUser = async (req, res) => {
  // Get Errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, email, password } = req.body;

  try {
    // Check for existing user
    const userExists = await User.findOne({ email });
    if (userExists)
      return res.status(400).json({ msg: 'User already exists' });

    const avatar = gravatar.url(email, {
      s: '200',
      r: 'pg',
      d: 'mm',
    });

    // Create Salt & Hash password
    const salt = await bcrypt.genSalt(10);
    if (!salt) throw Error('Something went wrong with bcrypt');

    const hash = await bcrypt.hash(password, salt);
    if (!hash) throw Error('Something went wrong hashing the password');

    const user = await User.create({
      name,
      email,
      avatar,
      password: hash,
    });

    if (!user) throw Error('Something went wrong saving the user');

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '90d',
    });

    res.status(201).json({ token });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

//  @route  POST api/auth/login
//  @desc   Login user
//  @access Public

exports.loginUser = async (req, res) => {
  // Get Errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    // Check for existing user
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: 'Invalid credentials' });

    // Validating password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '90d',
    });

    res.status(200).json({ token });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

//  @route  GET api/auth/user
//  @desc   Get user data
//  @access Private

exports.getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) throw Error('User does not exist');

    return res.status(200).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
