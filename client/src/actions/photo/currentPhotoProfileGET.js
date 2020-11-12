import axios from 'axios';
import {
	CURRENT_PHOTO_PROFILE_FETCHED,
	CURRENT_PHOTO_PROFILE_FETCHING_ERROR,
} from '../types';

// get photo by id
export const currentPhotoProfileGET = (id) => async (dispatch) => {
	try {
        const res = await axios.get(`/api/profile/user/${id}`);

		dispatch({
			type: CURRENT_PHOTO_PROFILE_FETCHED,
			payload: res.data,
		});
	} catch (error) {
		dispatch({
			type: CURRENT_PHOTO_PROFILE_FETCHING_ERROR,
			payload: 'Error fetching profile for current photo',
		});
	}
};
