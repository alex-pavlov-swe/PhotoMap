import {
  GET_PROFILE,
  GET_PROFILES,
  PROFILE_ERROR,
  UPDATE_PROFILE,
  CLEAR_PROFILE,
  ALL_PHOTOS_BY_PROFILE_FETCHED,
	ALL_PHOTOS_BY_PROFILE_FETCHING_ERROR
} from '../actions/types';

const initialState = {
  profile: null,
  profiles: [],
  loading: true,
  photos: [],
  error: {}
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_PROFILE:
    case UPDATE_PROFILE:
      return {
        ...state,
        profile: payload,
        loading: false
      };
    case GET_PROFILES:
      return {
        ...state,
        profiles: payload,
        loading: false
      };
    case CLEAR_PROFILE:
      return {
        ...state,
        profile: null,
        loading: false
      };
    case PROFILE_ERROR:
    case ALL_PHOTOS_BY_PROFILE_FETCHING_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };
    case ALL_PHOTOS_BY_PROFILE_FETCHED:
      return {
        ...state,
        photos: payload,
        loading: false
      };
    default:
      return state;
  }
}
