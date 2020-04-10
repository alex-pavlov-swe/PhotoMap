import axios from 'axios';
import {
  ADD_REVIEW,
  REVIEW_ERROR,
  GET_REVIEWS,
  DELETE_REVIEW,
  UPDATE_LIKES,
  ADD_COMMENT,
  GET_REVIEW
} from './types';
import { setAlert } from '../actions/alert';

export const addReview = (
  text,
  profileId,
  userName,
  avatar
) => async dispatch => {
  const body = {
    profileId: profileId,
    text: text,
    userName: userName,
    avatar: avatar
  };
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  try {
    const res = await axios.post('/api/reviews', body, config);

    dispatch({
      type: ADD_REVIEW,
      payload: res.data
    });

    dispatch(setAlert('Review added. Thank you!'));
  } catch (errors) {
    console.error(errors);
    if (errors) {
      //errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
      dispatch({
        type: REVIEW_ERROR,
        payload: errors
      });
    }
  }
};
// get all Reviews for a specific profile
export const getReviews = profileId => async dispatch => {
  try {
    const res = await axios.get(`/api/reviews/${profileId}`);

    dispatch({
      type: GET_REVIEWS,
      payload: res.data
    });
  } catch (error) {
    dispatch({
      type: REVIEW_ERROR,
      payload: 'error in get request to api/reviews in getReviews'
    });
  }
};

export const deleteReview = reviewId => async dispatch => {
  try {
    const res = await axios.delete(`/api/reviews/${reviewId}`);

    dispatch({
      type: DELETE_REVIEW,
      payload: reviewId
    });
    dispatch(setAlert('Review removed', 'success'));
  } catch (error) {
    dispatch({
      type: REVIEW_ERROR,
      payload: { msg: error.response.statusText, status: error.response.status }
    });
  }
};

export const addLike = reviewId => async dispatch => {
  try {
    const res = await axios.put(`/api/reviews/like/${reviewId}`);
    console.log(res);
    dispatch({
      type: UPDATE_LIKES,
      payload: { reviewId, likes: res.data }
    });
  } catch (error) {
    dispatch({
      type: REVIEW_ERROR,
      payload: { msg: error.response.statusText, status: error.response.status }
    });
  }
};

export const removeLike = reviewId => async dispatch => {
  try {
    const res = await axios.put(`/api/reviews/unlike/${reviewId}`);

    dispatch({
      type: UPDATE_LIKES,
      payload: { reviewId, likes: res.data }
    });
  } catch (error) {
    dispatch({
      type: REVIEW_ERROR,
      payload: { msg: error.response.statusText, status: error.response.status }
    });
  }
};

export const addComment = (reviewId, text) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = {
    text: text
  };

  try {
    const res = await axios.post(
      `/api/reviews/comment/${reviewId}`,
      body,
      config
    );

    dispatch({
      type: ADD_COMMENT,
      payload: res.data
    });

    dispatch(setAlert('Comment Added', 'success'));
  } catch (error) {
    dispatch({
      type: REVIEW_ERROR,
      payload: { msg: error.response.statusText, status: error.response.status }
    });
  }
};

// Get a single review to view its comments
export const getReview = reviewId => async dispatch => {
  try {
    const res = await axios.get(`/api/reviews/review/${reviewId}`);
    dispatch({
      type: GET_REVIEW,
      payload: res.data
    });
  } catch (error) {
    dispatch({
      type: REVIEW_ERROR,
      payload: 'error in get request to api/reviews in getReviews'
    });
  }
};
