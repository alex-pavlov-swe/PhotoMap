import axios from 'axios';
import { setAlert } from '../alert';
import {
	MONGO_PHOTO_DELETED,
	MONGO_PHOTO_DELETING_ERROR,
} from '../../actions/types';

// Delete photo from MongoDb
export const deletePhotoFromMongo = (photoId, imageName, history) => async (
	dispatch
) => {
	try {
		const res = await axios.delete(`/api/photo/${photoId}`);
		dispatch({
			type: MONGO_PHOTO_DELETED,
			payload: photoId,
		});
		history.push('/feed');
	} catch (error) {
		dispatch({
			type: MONGO_PHOTO_DELETING_ERROR,
			payload: error,
		});
	}
};
