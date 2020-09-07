import axios from 'axios';
import {
	FEED_PHOTOS_FETCHED,
	FEED_PHOTOS_FETCHING_ERROR,
	FEED_PHOTOS_LOADING_COMPLETED,
} from '../../actions/types';

// get all photos from Mongo
export const getPhotos = () => async (dispatch) => {
	try {
		const res = await axios.get('api/photo');

		dispatch({
			type: FEED_PHOTOS_FETCHED,
			payload: res.data,
		});
	} catch (error) {
		const errors = error.response.data.errors;

		if (errors) {
			errors.forEach((error) => console.error(error));
		}
		dispatch({
			type: FEED_PHOTOS_FETCHING_ERROR,
			payload: errors,
		});
	}
};

// Getting photos to photoScroll is complete
export const loadingCompleted = () => async (dispatch) => {
	try {
		dispatch({
			type: FEED_PHOTOS_LOADING_COMPLETED,
		});
	} catch (error) {
		console.log(error);
		dispatch({
			type: FEED_PHOTOS_FETCHING_ERROR,
			payload: 'error while loading completed',
		});
	}
};
