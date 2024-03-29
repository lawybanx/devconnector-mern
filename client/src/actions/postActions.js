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

const api = axios.create({
  baseURL: 'https://devconnector-backend-ggna.onrender.com/api',
});

// Get all Posts
export const getPosts = () => async (dispatch, getState) => {
  try {
    const res = await api.get('/posts', tokenConfig(getState));

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
    const res = await api.get(`/posts/${id}`, tokenConfig(getState));

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
    const res = await api.post('/posts', formdata, tokenConfig(getState));

    dispatch({ type: ADD_POST, payload: res.data });

    dispatch(setAlert('Post Created', 'success'));
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

// Add like
export const addLike = id => async (dispatch, getState) => {
  try {
    const res = await api.get(`/posts/like/${id}`, tokenConfig(getState));

    dispatch({ type: UPDATE_LIKES, payload: { id, likes: res.data } });
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

// Remove like
export const removeLike = id => async (dispatch, getState) => {
  try {
    const res = await api.get(`/posts/unlike/${id}`, tokenConfig(getState));

    dispatch({ type: UPDATE_LIKES, payload: { id, likes: res.data } });
    // dispatch({ type: UPDATE_LIKES, payload });
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

// Delete Post
export const deletePost = id => async (dispatch, getState) => {
  try {
    await api.delete(`/posts/${id}`, tokenConfig(getState));

    dispatch({ type: DELETE_POST, payload: id });

    dispatch(setAlert('Post Removed', 'success'));
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

// Add Comment
export const addComment = (postId, formdata) => async (dispatch, getState) => {
  try {
    const res = await api.post(
      `/posts/comment/${postId}`,
      formdata,
      tokenConfig(getState)
    );

    dispatch({ type: ADD_COMMENT, payload: res.data });

    dispatch(setAlert('Comment Added', 'success'));
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

// Delete Comment
export const deleteComment =
  (postId, commentId) => async (dispatch, getState) => {
    try {
      await api.delete(
        `/posts/comment/${postId}/${commentId}`,
        tokenConfig(getState)
      );

      dispatch({ type: REMOVE_COMMENT, payload: commentId });

      dispatch(setAlert('Comment Removed', 'success'));
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
