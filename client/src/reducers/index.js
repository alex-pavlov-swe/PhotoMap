import { combineReducers } from 'redux';
import alert from './alert';
import lang from './lang';
import auth from './auth';
import profile from './profile';
import settings from './settings';
import reviews from './reviews';
// PHOTOMAP
import photoUpload from './photoUpload';
import photoScroll from './photoScroll';
import currentPhoto from './currentPhoto';
import mapState from './mapState'

export default combineReducers({
  alert,
  lang,
  auth,
  profile,
  settings,
  reviews,
  photoUpload,
  photoScroll,
  currentPhoto,
  mapState
});
