import {
	FEED_PHOTOS_FETCHED,
	FEED_PHOTOS_FETCHING_ERROR,
	FEED_PHOTOS_LOADING_COMPLETED,
	FEED_CLEARED,
} from '../actions/types';

const initialState = {
	photos: null,
	loading: true,
	error: {},
};

export default function (state = initialState, action) {
	const { type, payload } = action;

	switch (type) {
		case FEED_PHOTOS_FETCHED:
			return {
				...state,
				photos: payload,
				loading: true,
			};
		case FEED_PHOTOS_LOADING_COMPLETED:
			return {
				...state,
				loading: false,
			};
		case FEED_PHOTOS_FETCHING_ERROR:
			return {
				...state,
				error: payload,
				loading: false,
			};
		case FEED_CLEARED:
			return {
				...state,
				photos: null,
				loading: false,
			};
		default:
			return state;
	}
}
