import axios from 'axios';
import { returnErrors } from './errorActions';

import {
  USER_LOADING,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
} from './actionTypes';

// Check token and load User
export const loadUser = () => async (dispatch, getState) => {
  try {
    // User Loading
    dispatch({ type: USER_LOADING });

    const res = await axios.get('/api/auth/user', tokenConfig(getState));

    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (err) {
    dispatch(returnErrors(err.response.data, err.response.status));
    dispatch({
      type: AUTH_ERROR,
    });
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
    } catch (err) {
      dispatch(
        returnErrors(err.response.data, err.response.status, 'REGISTER_FAIL')
      );
      dispatch({
        type: REGISTER_FAIL,
      });
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
    } catch (err) {
      dispatch(
        returnErrors(err.response.data, err.response.status, 'LOGIN_FAIL')
      );
      dispatch({
        type: LOGIN_FAIL,
      });
    }
  };

// Logout User
export const logout = () => {
  return {
    type: LOGOUT_SUCCESS,
  };
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
