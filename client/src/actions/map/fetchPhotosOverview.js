import axios from 'axios';
import {
    MAP_PHOTOS_OVERVIEW_LOADED,
    MAP_PHOTOS_OVERVIEW_LOADING_ERROR
} from '../../actions/types';

// Fetch photos from Mongo to show on a map overview
export const fetchPhotosOverview = (params, history) => async (dispatch) => {
	const config = {
		headers: {
			'Content-Type': 'application/json',
		},
	};
	const body = JSON.stringify(params);

	try {
		const res = await axios.get('/api/map/photos/overview', body, config);
		
		dispatch({
			type: MAP_PHOTOS_OVERVIEW_LOADED,
			payload: res.data,
		});
	} catch (error) {
		dispatch({
			type: MAP_PHOTOS_OVERVIEW_LOADING_ERROR,
			payload: error,
		});
	}
};
