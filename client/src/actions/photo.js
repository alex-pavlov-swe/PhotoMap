import axios from 'axios';
import { firebase, storage } from '../firebase/index';
import { setAlert } from './alert';
import {
	UPLOAD_PHOTO,
	UPLOAD_ERROR,
	UPDATE_ERROR,
	GET_PHOTOS,
	GET_PHOTOS_ERROR,
	LOADING_COMPLETED,
	UPLOADING,
	GET_CURRENT_PHOTO,
	CURRENT_PHOTO_ERROR,
	DELETE_PHOTO,
	DELETE_FROM_FIREBASE,
} from '../actions/types';

// get photo by id
export const getPhotoById = (id) => async (dispatch) => {
	try {
		const res = await axios.get(`/api/photo/${id}`);

		dispatch({
			type: GET_CURRENT_PHOTO,
			payload: res.data,
		});
	} catch (error) {
		dispatch({
			type: CURRENT_PHOTO_ERROR,
			payload: 'error getting current photo',
		});
	}
};

// get all photos from Mongo
export const getPhotos = () => async (dispatch) => {
	try {
		const res = await axios.get('api/photo');

		dispatch({
			type: GET_PHOTOS,
			payload: res.data,
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

// Getting photos to photoScroll is complete
export const loadingCompleted = () => async (dispatch) => {
	try {
		dispatch({
			type: LOADING_COMPLETED,
		});
	} catch (error) {
		console.log(error);
		dispatch({
			type: GET_PHOTOS_ERROR,
			payload: 'error while loading completed',
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
		});

		const storageRef = firebase.storage().ref('photos/' + imageName);
		await storageRef.put(file);

		const photo = {
			url: `https://firebasestorage.googleapis.com/v0/b/photomap-9caa6.appspot.com/o/photos%2F${imageName}?alt=media`,
			imageName: imageName,
		};

		dispatch({
			type: UPLOAD_PHOTO,
			payload: photo,
		});

		dispatch(setAlert('Photo Uploaded to Firebase!'));

		history.push('./uploadDetails');
	} catch (error) {
		dispatch({
			type: UPLOAD_ERROR,
			payload: error,
		});
	}
};

// Upload information about photo to MongoDB
export const uploadPhotoMongo = (photo, history) => async (dispatch) => {
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

		dispatch(setAlert('Photo data uploaded to MongoDB'));

		history.push(`/photo/${res.data._id}`);
	} catch (error) {
		dispatch({
			type: UPLOAD_ERROR,
			payload: error,
		});
	}
};

// Update information about photo in MongoDB
export const updatePhotoMongo = (photo, history) => async (dispatch) => {
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

		dispatch(setAlert('Photo data updated in MongoDB'));
		history.push(`/photo/${res.data[0]._id}`);
	} catch (error) {
		dispatch({
			type: UPDATE_ERROR,
			payload: error,
		});
	}
};

// Delete photo from MongoDb
export const deletePhotoFromMongo = (photoId, imageName, history) => async (
	dispatch
) => {
	try {
		const res = await axios.delete(`/api/photo/${photoId}`);
		dispatch({
			type: DELETE_PHOTO,
			payload: photoId,
		});
		history.push('/feed');
	} catch (error) {
		dispatch({
			type: CURRENT_PHOTO_ERROR,
			payload: error,
		});
	}
};

// Delete photo from Firebase
export const deletePhotoFromFirebase = (imageName) => async (dispatch) => {
	try {
		const storageRef = firebase.storage().ref('photos/' + imageName);
		await storageRef.delete();

		dispatch({
			type: DELETE_FROM_FIREBASE,
		});

		dispatch(setAlert('Photo Deleted from Firebase!'));
	} catch (error) {
		dispatch({
			type: CURRENT_PHOTO_ERROR,
			payload: error,
		});
	}
};
