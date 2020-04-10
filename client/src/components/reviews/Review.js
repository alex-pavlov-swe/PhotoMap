import React, { useEffect, Fragment } from 'react';
import { getReview } from '../../actions/reviews';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { Link } from 'react-router-dom';
import ProfileAddComment from './ProfileAddComment';

const Review = ({ getReview, reviews: { review, loading }, match }) => {
  useEffect(() => {
    getReview(match.params.id);
  }, [getReview]);

  return (
    <div className="row mt-4 mb-4 full-page">
      <div className="col-sm-10 offset-1">
        {loading ? (
          <Spinner />
        ) : (
          <Fragment>
            <Link
              className="btn btn-info mb-4"
              to={`/profile/${review ? review.profileId : ''}`}
            >
              Back to Profile
            </Link>
            <div className="card mt-3">
              <div className="card-header">
                <strong>
                  {review ? review.name : ''} wrote on{' '}
                  {review ? review.date.slice(0, 10) : ''}:
                </strong>
              </div>
              <div className="card-body">
                <p>{review ? review.text : '...'}</p>
              </div>
            </div>
            <ProfileAddComment profileId={match.params.id} />
          </Fragment>
        )}
      </div>
    </div>
  );
};

Review.propTypes = {
  getReview: PropTypes.func.isRequired,
  reviews: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  reviews: state.reviews
});

export default connect(mapStateToProps, { getReview })(Review);
