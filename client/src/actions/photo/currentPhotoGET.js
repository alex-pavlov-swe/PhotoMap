import axios from 'axios';
import {
	CURRENT_PHOTO_FETCHED,
	CURRENT_PHOTO_FETCHING_ERROR,
} from '../../actions/types';

// get photo by id
export const getPhotoById = (id) => async (dispatch) => {
	try {
		const res = await axios.get(`/api/photo/${id}`);

		dispatch({
			type: CURRENT_PHOTO_FETCHED,
			payload: res.data,
		});
	} catch (error) {
		dispatch({
			type: CURRENT_PHOTO_FETCHING_ERROR,
			payload: 'Error fetching current photo',
		});
	}
};
