import axios from 'axios';
import {
    CURRENT_PHOTO_FETCHED,
    CURRENT_PHOTO_FETCHING_ERROR,
    CURRENT_PHOTO_CLOSED,
    CURRENT_PHOTO_CLOSING_ERROR,
    CURRENT_PHOTO_PROFILE_FETCHED,
    CURRENT_PHOTO_PROFILE_FETCHING_ERROR,
    CURRENT_PHOTO_SHOW_ON_MAP,
    CURRENT_PHOTO_SHOW_ON_MAP_FINISH,
} from '../actions/types';

export const getPhotoById = (id) => async (dispatch) => {
    console.log("llllll");
    try {
        const res = await axios.get(`/api/photo/${id}`);

        dispatch({
            type: CURRENT_PHOTO_FETCHED,
            payload: res.data,
        });
    } catch (error) {
        dispatch({
            type: CURRENT_PHOTO_FETCHING_ERROR,
            payload: 'Error fetching current photo',
        });
    }
};

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

export const currentPhotoProfileGET = (id) => async (dispatch) => {
    try {
        const res = await axios.get(`/api/profile/user/${id}`);

        dispatch({
            type: CURRENT_PHOTO_PROFILE_FETCHED,
            payload: res.data,
        });
    } catch (error) {
        dispatch({
            type: CURRENT_PHOTO_PROFILE_FETCHING_ERROR,
            payload: 'Error fetching profile for current photo',
        });
    }
};

export const showPhotoOnMap = () => async (distpatch) => {
    distpatch({
        type: CURRENT_PHOTO_SHOW_ON_MAP,
    });
}

export const showPhotoOnMapFinish = () => async (distpatch) => {
    distpatch({
        type: CURRENT_PHOTO_SHOW_ON_MAP_FINISH,
    });
}