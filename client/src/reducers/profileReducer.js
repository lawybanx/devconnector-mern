import {
  GET_PROFILE,
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

    case CLEAR_PROFILE:
      return { ...state, profile: null, repos: [], loading: false };

    case PROFILE_ERROR:
      return { ...state, error: payload, loading: false };

    default:
      return state;
  }
};

export default profileReducer;
