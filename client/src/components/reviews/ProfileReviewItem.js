import React from 'react';
import { deleteReview, addLike, removeLike } from '../../actions/reviews';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const ProfileReviewItem = ({
  review: review,
  auth,
  deleteReview,
  addLike,
  removeLike
}) => {
  const date = new Date(review.date);

  let deleteButton = false;

  const { isAuthenticated } = auth;

  if (auth.isAuthenticated) {
    if (auth.user._id === review.user) {
      deleteButton = true;
    }
  }

  return (
    <div className="card mt-3">
      <div className="card-header">
        <strong>
          {review.name} wrote on {review.date.slice(0, 10)}:
        </strong>
      </div>
      <div className="card-body">
        <p>{review.text}</p>
      </div>
      <div className="card-footer justify-content-end">
        {isAuthenticated && (
          <button
            className="btn btn-light"
            type="button"
            title="Like the Review"
            onClick={() => addLike(review._id)}
          >
            <i className="fas fa-thumbs-up 2x"></i>
            <span>
              {review.likes.length > 0 && <span>{review.likes.length}</span>}
            </span>
          </button>
        )}
        {isAuthenticated && (
          <button
            className="btn btn-light"
            type="button"
            title="Dislike the Review"
            onClick={() => removeLike(review._id)}
          >
            <i className="fas fa-thumbs-down 2x"></i>
          </button>
        )}
        {/*
        <Link
          to={`/profile/review/${review._id}`}
          className="btn btn-info ml-2 mr-3"
        >
          Discussion
        </Link>
        */}
        {deleteButton && (
          <button
            className="btn-danger"
            title="Delete Review"
            onClick={() => deleteReview(review._id)}
          >
            <i className="fas fa-times" />
          </button>
        )}
      </div>
    </div>
  );
};

ProfileReviewItem.propTypes = {
  review: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deleteReview: PropTypes.func.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { deleteReview, addLike, removeLike })(
  ProfileReviewItem
);
