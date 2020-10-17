import axios from 'axios';
import {
    CURRENT_PHOTO_CLOSED,
    CURRENT_PHOTO_CLOSING_ERROR
} from '../../actions/types';

// get photo by id
export const currentPhotoClose = () => async (dispatch) => {
	try {
		dispatch({
			type: CURRENT_PHOTO_CLOSED
		});
	} catch (error) {
		dispatch({
			type: CURRENT_PHOTO_CLOSING_ERROR,
			payload: 'Error CLOSING current photo',
		});
	}
};
