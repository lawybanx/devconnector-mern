const express = require('express');
const router = express.Router();
const {
  getProfile,
  createProfile,
  getAllProfiles,
  getProfileById,
  deleteProfile,
} = require('../../controllers/profileController');
const auth = require('../../middleware/auth');
const { check } = require('express-validator');

router.route('/me').get(auth, getProfile);

router
  .route('/')
  .get(getAllProfiles)
  .post(
    check('status', 'Status is required').notEmpty(),
    check('skills', 'Skills is required').notEmpty(),
    auth,
    createProfile
  )
  .delete(auth, deleteProfile);

router.get('/user/:user_id', getProfileById);

module.exports = router;
