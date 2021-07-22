import axios from 'axios';

import {
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  CLEAR_PROFILE,
} from './actionTypes';
import { setAlert } from './alertActions';

// Check token and load User
export const loadUser = () => async (dispatch, getState) => {
  try {
    const res = await axios.get('/api/auth/user', tokenConfig(getState));

    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (err) {
    dispatch({ type: AUTH_ERROR });
  }
};

// Register User
export const registerUser =
  ({ name, email, password }) =>
  async dispatch => {
    try {
      // Headers
      const config = {
        headers: {
          'Content-type': 'application/json',
        },
      };

      // Request body
      const body = JSON.stringify({ name, email, password });

      const res = await axios.post('/api/auth/register', body, config);

      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      });
      dispatch(loadUser());
    } catch (err) {
      const errors = err.response.data.errors;

      if (errors) {
        errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
      } else {
        dispatch(setAlert(err.response.data.msg, 'danger'));
      }

      dispatch({ type: REGISTER_FAIL });
    }
  };

// Login User
export const loginUser =
  ({ email, password }) =>
  async dispatch => {
    try {
      // Headers
      const config = {
        headers: {
          'Content-type': 'application/json',
        },
      };

      // Request body
      const body = JSON.stringify({ email, password });

      const res = await axios.post('/api/auth/login', body, config);

      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });
      dispatch(loadUser());
    } catch (err) {
      const errors = err.response.data.errors;

      if (errors) {
        errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
      } else {
        dispatch(setAlert(err.response.data.msg, 'danger'));
      }

      dispatch({ type: LOGIN_FAIL });
    }
  };

// Logout User
export const logout = () => dispatch => {
  dispatch({ type: CLEAR_PROFILE });
  dispatch({ type: LOGOUT_SUCCESS });
};

// Setup config/headers and token
export const tokenConfig = getState => {
  // Get token from localstorage
  const token = getState().auth.token;

  // Headers
  const config = {
    headers: {
      'Content-type': 'application/json',
    },
  };

  // If token, add to headers
  if (token) {
    config.headers['x-auth-token'] = token;
  }

  return config;
};
