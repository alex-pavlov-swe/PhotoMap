import axios from 'axios';
import {
	ALL_PHOTOS_BY_PROFILE_FETCHED,
	ALL_PHOTOS_BY_PROFILE_FETCHING_ERROR,
} from '../types';

// get all photos by profile
export const photosAllByProfileGET = (userId) => async (dispatch) => {
	try {
		const res = await axios.get(`/api/photos/${userId}/`);

		dispatch({
			type: ALL_PHOTOS_BY_PROFILE_FETCHED,
			payload: res.data,
		});
	} catch (error) {
		dispatch({
			type: ALL_PHOTOS_BY_PROFILE_FETCHING_ERROR,
			payload: 'Error fetching all photos for a profile',
		});
	}
};
