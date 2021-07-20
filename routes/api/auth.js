const express = require('express');
const router = express.Router();
const {
  registerUser,
  loginUser,
  getUser,
} = require('../../controllers/userController');
const { check } = require('express-validator');
const auth = require('../../middleware/auth');

router.post(
  '/register',

  check('name', 'Name is required').notEmpty(),
  check('email', 'Email is required').notEmpty(),
  check('email', 'Email is not valid').isEmail(),
  check(
    'password',
    'Please enter a password with 6 or more characters'
  ).isLength({ min: 6 }),
  registerUser
);

router.post(
  '/login',

  check('email', 'Email is required').notEmpty(),
  check('email', 'Email is not valid').isEmail(),
  check('password', 'Password is required').notEmpty(),
  loginUser
);

router.get('/user', auth, getUser);

module.exports = router;
