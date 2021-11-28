import axios from 'axios';
import { tokenConfig } from './authActions';
import { setAlert } from './alertActions';

import {
  GET_POSTS,
  POST_ERROR,
  UPDATE_LIKES,
  DELETE_POST,
  ADD_POST,
  GET_POST,
  ADD_COMMENT,
  REMOVE_COMMENT,
} from './actionTypes';

// Get all Posts
export const getPosts = () => async (dispatch, getState) => {
  try {
    const res = await axios.get('/api/posts', tokenConfig(getState));

    dispatch({ type: GET_POSTS, payload: res.data });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};

// Get Post By ID
export const getPost = id => async (dispatch, getState) => {
  try {
    const res = await axios.get(`/api/posts/${id}`, tokenConfig(getState));

    dispatch({ type: GET_POST, payload: res.data });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};

// Add Post
export const addPost = formdata => async (dispatch, getState) => {
  try {
    const res = await axios.post('/api/posts', formdata, tokenConfig(getState));

    dispatch({ type: ADD_POST, payload: res.data });

    dispatch(setAlert('Post Added', 'success'));
  } catch (err) {}
};
