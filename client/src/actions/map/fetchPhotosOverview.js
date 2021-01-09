import axios from 'axios';
import {
    MAP_PHOTOS_OVERVIEW_LOADED,
    MAP_PHOTOS_OVERVIEW_LOADING_ERROR
} from '../../actions/types';

// Fetch photos from Mongo to show on a map overview
export const fetchPhotosOverview = (bounds) => async (dispatch) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };
    const body = JSON.stringify({ bounds });

    try {
        const res = await axios.post(`/api/map/photos/overview/web`, body, config);

        dispatch({
            type: MAP_PHOTOS_OVERVIEW_LOADED,
            payload: res.data,
        });

        return res;
    } catch (error) {
        dispatch({
            type: MAP_PHOTOS_OVERVIEW_LOADING_ERROR,
            payload: error,
        });
    }
};
