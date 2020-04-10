import axios from 'axios';
import { firebase, storage } from '../firebase/index';
import { setAlert } from './alert';
import {
  UPLOAD_PHOTO,
  UPLOAD_ERROR,
  GET_PHOTOS,
  GET_PHOTOS_ERROR,
  UPLOADING,
} from '../actions/types';

// get all photos from Mongo
export const getPhotos = () => async (dispatch) => {
  try {
    const res = await axios.get('api/photo');

    dispatch({
      type: GET_PHOTOS,
      payload: res,
    });
  } catch (error) {
    const errors = error.response.data.errors;

    if (errors) {
      errors.forEach((error) => console.error(error));
    }
    dispatch({
      type: GET_PHOTOS_ERROR,
      payload: errors,
    });
  }
};

// Upload photo to Firebase
export const uploadPhotoFirebase = (file, imageName, history) => async (
  dispatch
) => {
  try {
    dispatch({
      type: UPLOADING,
      payload: null,
    });
    const storageRef = firebase.storage().ref('photos/' + imageName);
    await storageRef.put(file);

    const photo = {
      url: `https://firebasestorage.googleapis.com/v0/b/photomap-9caa6.appspot.com/o/photos%2F${imageName}?alt=media`,
    };

    dispatch({
      type: UPLOAD_PHOTO,
      payload: photo,
    });

    dispatch(setAlert('Photo Uploaded to Firebase!'));

    history.push('./uploadDetails');
  } catch (error) {
    const errors = error.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: UPLOAD_ERROR,
      payload: errors,
    });
  }
};

// Upload information about photo to MongoDB
export const uploadPhotoMongo = (photo, history, edit = true) => async (
  dispatch
) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const body = JSON.stringify(photo);

  try {
    const res = await axios.post('/api/photo', body, config);

    dispatch({
      type: UPLOAD_PHOTO,
      payload: res.data,
    });

    dispatch(
      setAlert(edit ? 'Photo data updated' : 'Photo data uploaded to MongoDB')
    );

    history.push('/dashboard');
  } catch (error) {
    const errors = error.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: UPLOAD_ERROR,
      payload: errors,
    });
  }
};
