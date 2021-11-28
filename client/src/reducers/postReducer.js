import {
  GET_POSTS,
  POST_ERROR,
  UPDATE_LIKES,
  DELETE_POST,
  ADD_POST,
  GET_POST,
  ADD_COMMENT,
  REMOVE_COMMENT,
} from '../actions/actionTypes';

const initialState = {
  post: null,
  posts: [],
  loading: true,
  error: {},
};

const postReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_POSTS:
      return { ...state, posts: payload, post: null, loading: false };

    case GET_POST:
      return { ...state, post: payload, loading: false };

    case ADD_POST:
      return { ...state, posts: [payload, ...state.posts], loading: false };

    case DELETE_POST:
      return {
        ...state,
        posts: [state.posts.filter(post => post._id === payload.id)],
        loading: false,
      };

    case POST_ERROR:
      return { ...state, error: payload, loading: false };

    default:
      return state;
  }
};

export default postReducer;
