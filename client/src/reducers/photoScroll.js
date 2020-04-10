import { GET_PHOTOS, GET_PHOTOS_ERROR, CLEAR_FEED } from '../actions/types';

const initialState = {
  photos: null,
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_PHOTOS:
      return {
        ...state,
        photos: payload,
        loading: false,
      };
    case GET_PHOTOS_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case CLEAR_FEED:
      return {
        ...state,
        photos: null,
        loading: false,
      };
    default:
      return state;
  }
}
