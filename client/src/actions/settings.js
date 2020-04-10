import { TOGGLE_MOBILE_MENU } from './types';

export const toggleMobileMenu = display => async dispatch => {
  dispatch({
    type: TOGGLE_MOBILE_MENU,
    payload: display
  });
};
