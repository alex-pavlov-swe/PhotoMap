import {
	FIREBASE_PHOTO_UPLOADED,
	FIREBASE_PHOTO_UPLOADING_ERROR,
	FIREBASE_PHOTO_UPLOADING,
	FIREBASE_PHOTO_DELETED,
	FIREBASE_PHOTO_DELETING_ERROR,
	MONGO_PHOTO_UPLOADED,
	MONGO_PHOTO_UPLOADING_ERROR,
	MONGO_PHOTO_UPDATED,
	MONGO_PHOTO_UPDATING_ERROR,
} from '../actions/types';

const inititalState = {
	photo: null,
	loading: false,
	error: {},
};

export default function (state = inititalState, action) {
	const { type, payload } = action;

	switch (type) {
		case FIREBASE_PHOTO_UPLOADED:
		case MONGO_PHOTO_UPLOADED:
		case MONGO_PHOTO_UPDATED:
			return {
				...state,
				photo: payload,
				loading: false,
			};
		case FIREBASE_PHOTO_UPLOADING_ERROR:
		case MONGO_PHOTO_UPLOADING_ERROR:
		case MONGO_PHOTO_UPDATING_ERROR:
		case FIREBASE_PHOTO_DELETING_ERROR:
			return {
				...state,
				error: payload,
				loading: false,
			};
		case FIREBASE_PHOTO_UPLOADING:
			return {
				...state,
				loading: true,
			};
		default:
			return state;
	}
}
