import {
  GET_CURRENT_PHOTO,
  CURRENT_PHOTO_ERROR,
  UPDATE_PHOTO,
  DELETE_PHOTO,
} from '../actions/types';

const initialState = {
  photo: null,
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_CURRENT_PHOTO:
    case UPDATE_PHOTO:
      return {
        ...state,
        photo: payload,
        loading: false,
      };
    case CURRENT_PHOTO_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
}
