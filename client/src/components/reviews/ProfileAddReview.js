import React, { useState } from 'react';
import { addReview } from '../../actions/reviews';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Alert from '../layout/Alert';
import { setAlert } from '../../actions/alert';

const ProfileAddReview = ({ lang, profileId, auth, addReview, setAlert }) => {
  const [formData, setFormData] = useState({
    reviewText: ''
  });

  const { reviewText } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    if (!auth.isAuthenticated) {
      setAlert('You should be logged in to post a comment', 'danger');
    } else if (!formData.reviewText) {
      setAlert(
        'You cant post an empty review, please write something',
        'danger'
      );
    } else {
      addReview(
        formData.reviewText,
        profileId,
        auth.user.name,
        auth.user.avatar
      );
      setFormData({ ...formData, reviewText: '' });
    }
  };

  return (
    <div>
      <Alert />
      <div className="bg-info text-white">
        <p className="m-2">
          <strong>
            {lang === 'rus' ? 'Напишите отзыв...' : 'Say something...'}
          </strong>
        </p>
      </div>
      <form className="mt-3" onSubmit={e => onSubmit(e)}>
        <textarea
          rows="4"
          value={reviewText}
          name="reviewText"
          onChange={e => onChange(e)}
          placeholder={
            lang === 'rus'
              ? 'Оставьте свой отзыв если вам довелось сотрудничать с данным человеком'
              : 'Leave a comment if you have something to say about this person'
          }
        ></textarea>
        <button className="btn btn-info mt-2 mb-2" type="submit">
          {lang === 'rus' ? 'Отправить' : 'Submit'}
        </button>
      </form>
    </div>
  );
};

ProfileAddReview.propTypes = {
  addReview: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
  lang: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  lang: state.lang,
  auth: state.auth
});

export default connect(mapStateToProps, { addReview, setAlert })(
  ProfileAddReview
);
