import { firebase } from '../../firebase/index';
import { setAlert } from '../alert';
import {
	FIREBASE_PHOTO_DELETED,
	FIREBASE_PHOTO_DELETING_ERROR,
} from '../../actions/types';

// Delete photo from Firebase
export const deletePhotoFromFirebase = (imageName) => async (dispatch) => {
	try {
		const storageRef = firebase.storage().ref('photos/' + imageName);
		await storageRef.delete();

		dispatch({
			type: FIREBASE_PHOTO_DELETED,
		});

		dispatch(setAlert('Photo Deleted from Firebase!'));
	} catch (error) {
		dispatch({
			type: FIREBASE_PHOTO_DELETING_ERROR,
			payload: error,
		});
	}
};
