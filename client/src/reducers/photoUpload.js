import { UPLOAD_PHOTO, UPLOAD_ERROR, UPLOADING } from '../actions/types';

const inititalState = {
  photo: null,
  loading: true,
  error: {},
};

export default function (state = inititalState, action) {
  const { type, payload } = action;

  switch (type) {
    case UPLOAD_PHOTO:
      return {
        ...state,
        photo: payload,
        loading: false,
      };
    case UPLOAD_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case UPLOADING:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
}
