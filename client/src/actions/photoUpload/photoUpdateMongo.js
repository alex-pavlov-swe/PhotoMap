import axios from 'axios';
import { setAlert } from '../alert';
import {
	MONGO_PHOTO_UPDATED,
	MONGO_PHOTO_UPDATING_ERROR,
} from '../../actions/types';

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
			type: MONGO_PHOTO_UPDATED,
			payload: res.data,
		});

		dispatch(setAlert('Photo data updated in MongoDB'));
		// history.push(`/photo/${res.data._id}`);
        history.push(`/map`);
	} catch (error) {
		dispatch({
			type: MONGO_PHOTO_UPDATING_ERROR,
			payload: error,
		});
	}
};
