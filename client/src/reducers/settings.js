import { TOGGLE_MOBILE_MENU } from '../actions/types';

const initialState = {
  mobileMenuDisplay: 'mobileMenuHide'
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case TOGGLE_MOBILE_MENU:
      return {
        ...state,
        mobileMenuDisplay: payload
      };
    default:
      return state;
  }
}
