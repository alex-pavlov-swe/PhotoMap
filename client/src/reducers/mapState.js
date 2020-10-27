import {
    MAP_PHOTOS_OVERVIEW_LOADED,
    MAP_PHOTOS_OVERVIEW_LOADING_ERROR
} from '../actions/types';

const initialState = {
    photosOverview: [],
    loading: true,
    error: {}
};

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case MAP_PHOTOS_OVERVIEW_LOADED:
            return {
                ...state,
                photosOverview: payload,
                loading: false
            };
        case MAP_PHOTOS_OVERVIEW_LOADING_ERROR:
            return {
                ...state,
                error: payload,
                loading: false
            };
        default:
            return state;
    }
}