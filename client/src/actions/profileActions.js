import axios from 'axios';
import { tokenConfig } from './authActions';
import { setAlert } from './alertActions';

import { GET_PROFILE, PROFILE_ERROR } from './actionTypes';

// Get current user profile
export const getCurrentProfile = () => async (dispatch, getState) => {
  try {
    const res = await axios.get('/api/profile/me', tokenConfig(getState));

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

// Create or Update profile
export const createProfile =
  (formData, navigate, edit = false) =>
  async (dispatch, getState) => {
    try {
      const res = await axios.post(
        '/api/profile',
        formData,
        tokenConfig(getState)
      );

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
      const errors = err.response.data.errors;

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

// Add an Experience
export const addExperience =
  (formData, navigate
    ) => async (dispatch, getState) => {
    try {
      const res = await axios.put(
        '/api/profile/experience',
        formData,
        tokenConfig(getState)
      );

      dispatch({
        type: GET_PROFILE,
        payload: res.data,
      });

      dispatch(setAlert('Experience Updated', 'success'));

      navigate('/dashboard');
    } catch (err) {
      const errors = err.response.data.errors;

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

export const deleteProfile = () => dispatch => {};
