const { validationResult } = require('express-validator');

// Bring in Models
const User = require('../models/User');
const Profile = require('../models/Profile');

//  @route  GET api/profile
//  @desc   Get All Profiles
//  @access Public

exports.getAllProfiles = async (req, res, next) => {
  try {
    const profiles = await Profile.find().populate('user', ['name', 'avatar']);

    res.status(200).json({
      success: true,
      count: profiles.length,
      data: profiles,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: 'Server Error',
    });
  }
};

//  @route  GET api/profile/me
//  @desc   Get Current User Profile
//  @access Private

exports.getProfile = async (req, res, next) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id,
    }).populate('user', ['name', 'avatar']);

    if (!profile) {
      return res.status(400).json({ msg: 'There is no profile for this user' });
    }

    return res.status(200).json(profile);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

//  @route  POST api/profile
//  @desc   Create & Update User Profile
//  @access Private

exports.createProfile = async (req, res) => {
  // Get Errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const {
    status,
    skills,
    company,
    website,
    location,
    bio,
    githubusername,
    youtube,
    facebook,
    twitter,
    instagram,
    linkedin,
  } = req.body;

  // Build profile object
  const profileFields = {};
  profileFields.user = req.user.id;
  if (status) profileFields.status = status;
  if (company) profileFields.company = company;
  if (website) profileFields.website = website;
  if (location) profileFields.location = location;
  if (bio) profileFields.bio = bio;
  if (githubusername) profileFields.githubusername = githubusername;
  if (skills)
    profileFields.skills = skills.split(',').map(skill => skill.trim());

  //Build Social object
  profileFields.social = {};
  if (twitter) profileFields.social.twitter = twitter;
  if (youtube) profileFields.social.youtube = youtube;
  if (instagram) profileFields.social.instagram = instagram;
  if (facebook) profileFields.social.facebook = facebook;
  if (linkedin) profileFields.social.linkedin = linkedin;

  try {
    let profile = await Profile.findOne({ user: req.user.id });

    if (profile) {
      // update
      profile = await Profile.findOneAndUpdate(
        { user: req.user.id },
        { $set: profileFields },
        { new: true }
      );

      return res.status(202).json(profile);
    }

    // Create
    profile = await Profile.create(profileFields);
    return res.status(201).json(profile);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

//  @route  GET api/profile/user/:user_id
//  @desc   Get User Profile by Id
//  @access Public

exports.getProfileById = async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.user_id,
    }).populate('user', ['name', 'avatar']);

    if (!profile) {
      return res.status(400).json({ msg: 'Profile not found' });
    }

    res.status(200).json(profile);
  } catch (err) {
    if (err.kind == 'ObjectId') {
      return res.status(400).json({ msg: 'Profile not found' });
    }

    res.status(400).json({ error: err.message });
  }
};

//  @route  DELETE api/profile
//  @desc   Delete profile, user & posts
//  @access Private

exports.deleteProfile = async (req, res) => {
  try {
    // Remove profile
    await Profile.findOneAndRemove({ user: req.user.id });

    // Remove user
    await User.findOneAndRemove({ _id: req.user.id });

    res.status(200).json({ msg: 'User deleted' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
