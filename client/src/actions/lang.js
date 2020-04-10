import { SET_LANG } from './types';

export const changeLanguage = newLang => async dispatch => {
  localStorage.lang = newLang;
  dispatch({
    type: SET_LANG,
    payload: newLang
  });
};
