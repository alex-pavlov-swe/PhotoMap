import { SET_LANG } from '../actions/types';

const initialState = {
  lang: 'eng'
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_LANG:
      return {
        ...state,
        lang: payload
      };
    default:
      return state;
  }
}
