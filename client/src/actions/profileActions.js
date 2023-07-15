import axios from 'axios';
import { tokenConfig } from './authActions';
import { setAlert } from './alertActions';

import {
  GET_PROFILE,
  GET_PROFILES,
  GET_REPOS,
  PROFILE_ERROR,
  UPDATE_PROFILE,
  CLEAR_PROFILE,
  ACCOUNT_DELETED,
} from './actionTypes';

const api = axios.create({
  baseURL: 'https://devconnector-backend-ggna.onrender.com/api',
});

// Get current user profile
export const getCurrentProfile = () => async (dispatch, getState) => {
  try {
    const res = await api.get('/profile/me', tokenConfig(getState));

    dispatch({ type: GET_PROFILE, payload: res.data });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};

// Get All profiles
export const getProfiles = () => async dispatch => {
  dispatch({ type: CLEAR_PROFILE });
  try {
    const res = await api.get('/profile');

    dispatch({
      type: GET_PROFILES,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};

// Get profile by ID
export const getProfileById = userId => async dispatch => {
  try {
    const res = await api.get(`/profile/user/${userId}`);

    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};

// Get Github Repos
export const getRepos = username => async dispatch => {
  try {
    const res = await api.get(`/profile/github/${username}`);

    dispatch({
      type: GET_REPOS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};

// Create or Update profile
export const createProfile =
  (formData, navigate, edit = false) =>
  async (dispatch, getState) => {
    try {
      const res = await api.post('/profile', formData, tokenConfig(getState));

      dispatch({
        type: GET_PROFILE,
        payload: res.data,
      });

      dispatch(
        setAlert(edit ? 'Profile Updated' : 'Profile Created', 'success')
      );

      if (!edit) {
        navigate('/dashboard');
      }
    } catch (err) {
      const { errors } = err.response.data;

      if (errors) {
        errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
      } else {
        dispatch(setAlert(err.response.data.msg, 'danger'));
      }
      dispatch({
        type: PROFILE_ERROR,
        payload: {
          msg: err.response.statusText,
          status: err.response.status,
        },
      });
    }
  };

// Add Experience
export const addExperience =
  (formData, navigate) => async (dispatch, getState) => {
    try {
      const res = await api.put(
        '/profile/experience',
        formData,
        tokenConfig(getState)
      );

      dispatch({
        type: UPDATE_PROFILE,
        payload: res.data,
      });

      dispatch(setAlert('Experience Added', 'success'));

      navigate('/dashboard');
    } catch (err) {
      const { errors } = err.response.data;

      if (errors) {
        errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
      } else {
        dispatch(setAlert(err.response.data.msg, 'danger'));
      }
      dispatch({
        type: PROFILE_ERROR,
        payload: {
          msg: err.response.statusText,
          status: err.response.status,
        },
      });
    }
  };

// Add Education
export const addEducation =
  (formData, navigate) => async (dispatch, getState) => {
    try {
      const res = await api.put(
        '/profile/education',
        formData,
        tokenConfig(getState)
      );

      dispatch({
        type: UPDATE_PROFILE,
        payload: res.data,
      });

      dispatch(setAlert('Education Added', 'success'));

      navigate('/dashboard');
    } catch (err) {
      const { errors } = err.response.data;

      if (errors) {
        errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
      } else {
        dispatch(setAlert(err.response.data.msg, 'danger'));
      }
      dispatch({
        type: PROFILE_ERROR,
        payload: {
          msg: err.response.statusText,
          status: err.response.status,
        },
      });
    }
  };

// Delete Experience
export const deleteExperience = id => async (dispatch, getState) => {
  try {
    const res = await api.delete(
      `/profile/experience/${id}`,
      tokenConfig(getState)
    );

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });

    dispatch(setAlert('Experience Deleted', 'success'));
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};

// Delete Education
export const deleteEducation = id => async (dispatch, getState) => {
  try {
    const res = await api.delete(
      `/profile/education/${id}`,
      tokenConfig(getState)
    );

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });

    dispatch(setAlert('Education Deleted', 'success'));
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};

// Delete Profile & User
export const deleteProfile = () => async (dispatch, getState) => {
  if (window.confirm('Are you sure? This can NOT be undone!')) {
    try {
      await api.delete('/profile', tokenConfig(getState));

      dispatch({ type: ACCOUNT_DELETED });
      dispatch({ type: CLEAR_PROFILE });

      dispatch(setAlert('Your account has been permanently deleted'));
    } catch (err) {
      dispatch({
        type: PROFILE_ERROR,
        payload: {
          msg: err.response.statusText,
          status: err.response.status,
        },
      });
    }
  }
};
