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
