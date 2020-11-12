import axios from 'axios';
import { setAlert } from './alert';
import {
  GET_PROFILE,
  GET_PROFILES,
  UPDATE_PROFILE,
  PROFILE_ERROR,
  CLEAR_PROFILE,
} from '../actions/types';
import { firebase, storage } from '../firebase/index';

// Get current user profile
export const getCurrentProfile = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/profile/me');
    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: 'error in get request to api/profile/me in getCurrentProfile',
    });
  }
};

// Get all profiles
export const getAllProfiles = () => async (dispatch) => {
  dispatch({ type: CLEAR_PROFILE });

  try {
    const res = await axios.get('/api/profile');

    dispatch({
      type: GET_PROFILES,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: PROFILE_ERROR,
      payload: 'error in get request to api/profile in getAllProfiles',
    });
  }
};

// get profile by ID
export const getProfileById = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/profile/user/${id}`);
    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload:
        'error in get request to api/profile/user/:userID in getProfileById',
    });
  }
};

// Update or Create Profile
export const updateProfile = (profile, edit = true) => async (
  dispatch
) => {
  console.log('updating profile...');
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const body = JSON.stringify(profile);

  try {
    const res = await axios.post('/api/profile/', body, config);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });

    dispatch(setAlert(edit ? 'Profile Updated' : 'Profile Created'));
  } catch (error) {
    const errors = error.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: PROFILE_ERROR,
      payload: errors,
    });
  }
};

// add avatar picture to a profile
export const uploadAvatar = (file, imageName) => async (dispatch) => {
  const storageRef = firebase.storage().ref('avatars/' + imageName);
  await storageRef.put(file);
};
