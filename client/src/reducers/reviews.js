import {
  ADD_REVIEW,
  GET_REVIEWS,
  DELETE_REVIEW,
  REVIEW_ERROR,
  UPDATE_LIKES,
  ADD_COMMENT,
  DELETE_COMMENT,
  GET_REVIEW
} from '../actions/types';

const initialState = {
  reviews: [],
  review: null,
  loading: true,
  error: {}
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_REVIEWS:
      return {
        ...state,
        reviews: payload,
        loading: false
      };
    case DELETE_REVIEW:
      return {
        ...state,
        reviews: state.reviews.filter(review => review._id !== payload),
        loading: false
      };
    case ADD_REVIEW:
      return {
        ...state,
        reviews: [payload, ...state.reviews],
        loading: false
      };
    case REVIEW_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };
    case UPDATE_LIKES:
      return {
        ...state,
        reviews: state.reviews.map(review =>
          review._id === payload.reviewId
            ? { ...review, likes: payload.likes }
            : review
        ),
        loading: false
      };
    case ADD_COMMENT:
      return {
        ...state,
        review: { ...state.review, comments: payload },
        loading: false
      };
    case DELETE_COMMENT:
      return {
        ...state,
        review: {
          ...state.review,
          comments: state.review.comments.filter(
            comment => comment._id !== payload
          )
        }
      };
    case GET_REVIEW:
      return {
        ...state,
        review: payload,
        loading: false
      };
    default:
      return state;
  }
}
