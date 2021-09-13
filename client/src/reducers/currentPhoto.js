import {
    CURRENT_PHOTO_FETCHED,
    CURRENT_PHOTO_FETCHING_ERROR,
    CURRENT_PHOTO_PROFILE_FETCHED,
    CURRENT_PHOTO_PROFILE_FETCHING_ERROR,
    MONGO_PHOTO_UPDATED,
    MONGO_PHOTO_UPDATING_ERROR,
    MONGO_PHOTO_DELETED,
    MONGO_PHOTO_DELETING_ERROR,
    FIREBASE_PHOTO_DELETED,
    FIREBASE_PHOTO_DELETING_ERROR,
    CURRENT_PHOTO_CLOSED,
    CURRENT_PHOTO_SHOW_ON_MAP,
    CURRENT_PHOTO_SHOW_ON_MAP_FINISH,
} from '../actions/types';

const initialState = {
    photo: null,
    profile: null,
    loading: true,
    error: {},
    showOnMap: false,
};

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case CURRENT_PHOTO_FETCHED:
        case MONGO_PHOTO_UPDATED:
            return {
                ...state,
                photo: payload,
                loading: false,
            };
        case CURRENT_PHOTO_PROFILE_FETCHED:
            return {
                ...state,
                profile: payload,
                loading: false,
            };
        case CURRENT_PHOTO_FETCHING_ERROR:
        case MONGO_PHOTO_DELETING_ERROR:
        case FIREBASE_PHOTO_DELETING_ERROR:
        case MONGO_PHOTO_UPDATING_ERROR:
        case CURRENT_PHOTO_PROFILE_FETCHING_ERROR:
            return {
                ...state,
                error: payload,
                loading: false,
            };
        case MONGO_PHOTO_DELETED:
            return {
                ...state,
                photo: null,
                loading: false,
            };
        case CURRENT_PHOTO_CLOSED:
            return {
                ...state,
                photo: null,
                loading: true,
                showOnMap: false,
            };
        case FIREBASE_PHOTO_DELETED:
            return {
                ...state,
                loading: false,
            };
        case CURRENT_PHOTO_SHOW_ON_MAP:
            return {
                ...state,
                showOnMap: true,
            };
        case CURRENT_PHOTO_SHOW_ON_MAP_FINISH:
            return {
                ...state,
                showOnMap: false,
            };
        default:
            return state;
    }
}
