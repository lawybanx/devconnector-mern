import {
  GET_PROFILE,
  GET_PROFILES,
  GET_REPOS,
  UPDATE_PROFILE,
  CLEAR_PROFILE,
  PROFILE_ERROR,
} from '../actions/actionTypes';

const initialState = {
  profile: null,
  profiles: [],
  repos: [],
  loading: true,
  error: {},
};

const profileReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_PROFILE:
    case UPDATE_PROFILE:
      return { ...state, profile: payload, loading: false };

    case GET_PROFILES:
      return { ...state, profiles: payload, loading: false };

    case GET_REPOS:
      return { ...state, repos: payload, loading: false };

    case CLEAR_PROFILE:
      return { ...state, profile: null, repos: [], loading: false };

    case PROFILE_ERROR:
      return { ...state, error: payload, loading: false, profile: null };

    default:
      return state;
  }
};

export default profileReducer;
