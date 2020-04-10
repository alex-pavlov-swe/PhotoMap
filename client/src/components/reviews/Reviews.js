import React, { useEffect } from 'react';
import { getReviews } from '../../actions/reviews';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from '../layout/Spinner';
import ProfileReviewItem from './ProfileReviewItem';
import ProfileCommentItem from './ProfileReviewItem';

const Reviews = ({
  lang,
  profileId,
  reviews: { reviews, loading },
  getReviews,
  profileName,
  auth
}) => {
  useEffect(() => {
    getReviews(profileId);
  }, [getReviews]);
  return (
    <div>
      <h4>{reviews ? `Reviews about ${profileName}` : ''}</h4>
      {loading ? (
        <Spinner />
      ) : (
        reviews.map(review => (
          <ProfileReviewItem review={review} key={review._id} />
        ))
      )}
    </div>
  );
};

Reviews.propTypes = {
  lang: PropTypes.object.isRequired,
  reviews: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  getReviews: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  lang: state.lang,
  reviews: state.reviews,
  auth: state.auth
});

export default connect(mapStateToProps, { getReviews })(Reviews);
