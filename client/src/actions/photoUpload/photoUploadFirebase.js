import { firebase } from '../../firebase/index';
import { setAlert } from '../alert';
import {
	FIREBASE_PHOTO_UPLOADED,
	FIREBASE_PHOTO_UPLOADING_ERROR,
	FIREBASE_PHOTO_UPLOADING,
} from '../../actions/types';

// Upload photo to Firebase
export const uploadPhotoFirebase = (file, imageName, userId, history) => async (
	dispatch
) => {
	try {
		dispatch({
			type: FIREBASE_PHOTO_UPLOADING,
		});

		const storageRef = firebase
			.storage()
			.ref('photos/' + userId + '/' + imageName);
		await storageRef.put(file);

		const photo = {
			url: `https://firebasestorage.googleapis.com/v0/b/photomap-9caa6.appspot.com/o/photos%2F${userId}%2F${imageName}?alt=media`,
			imageName: imageName,
		};

		dispatch({
			type: FIREBASE_PHOTO_UPLOADED,
			payload: photo,
		});

		dispatch(setAlert('Photo Uploaded to Firebase!'));

		history.push('./uploadDetails');
	} catch (error) {
		dispatch({
			type: FIREBASE_PHOTO_UPLOADING_ERROR,
			payload: error,
		});
	}
};
