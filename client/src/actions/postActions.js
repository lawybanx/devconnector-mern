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
    const res = await axios.put(`/api/posts/like/${id}`, tokenConfig(getState));

    dispatch({ type: UPDATE_LIKES, payload: { id, likes: res.data } });
    console.log(res.data);
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
    const res = await axios.put(
      `/api/posts/unlike/${id}`,
      tokenConfig(getState)
    );

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

// Delete Post
// export const deletePost = id => async (dispatch, getState) => {
//   try {
//     const res = await axios.delete(`/api/posts/${id}`, tokenConfig(getState));

//     dispatch({ type: DELETE_POST, payload: res.data });
//   } catch (err) {
//     dispatch({
//       type: POST_ERROR,
//       payload: {
//         msg: err.response.statusText,
//         status: err.response.status,
//       },
//     });
//   }
// };
