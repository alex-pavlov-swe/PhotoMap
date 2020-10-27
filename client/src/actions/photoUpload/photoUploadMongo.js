import axios from 'axios';
import { setAlert } from '../alert';
import {
	MONGO_PHOTO_UPLOADED,
	MONGO_PHOTO_UPLOADING_ERROR,
} from '../../actions/types';

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
			type: MONGO_PHOTO_UPLOADED,
			payload: res.data,
		});

		dispatch(setAlert('Photo data uploaded to MongoDB'));

		history.push(`/photo/${res.data._id}`);
	} catch (error) {
		dispatch({
			type: MONGO_PHOTO_UPLOADING_ERROR,
			payload: error,
		});
	}
};
