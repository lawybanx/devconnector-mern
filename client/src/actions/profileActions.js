import axios from 'axios';
import { tokenConfig } from './authActions';
import { setAlert } from './alertActions';

import { CREATE_PROFILE, GET_PROFILE, PROFILE_ERROR } from './actionTypes';

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

// Create new profile
export const createProfile = formData => async (dispatch, getState) => {
  try {
    const res = await axios.post(
      '/api/profile',
      formData,
      tokenConfig(getState)
    );

    dispatch({
      type: CREATE_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    } else {
      dispatch(setAlert(err.response.data.msg, 'danger'));
    }
    dispatch({ type: PROFILE_ERROR });
  }
};
