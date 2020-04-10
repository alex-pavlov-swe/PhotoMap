import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Alert from '../layout/Alert';
import { setAlert } from '../../actions/alert';
import { Link } from 'react-router-dom';
import { addComment } from '../../actions/reviews';

const ProfileAddComment = ({ lang, profileId, auth, addComment, setAlert }) => {
  const [formData, setFormData] = useState({
    commentText: ''
  });

  const { commentText } = formData;

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
      addComment(
        formData.commentText,
        profileId,
        auth.user.name,
        auth.user.avatar
      );
      setFormData({ ...formData, commentText: '' });
    }
  };

  return (
    <div>
      <Alert />
      <div className="bg-info text-white">
        <p className="m-2">
          <strong>
            {lang === 'rus' ? 'Напишите комментарий...' : 'Leave a comment...'}
          </strong>
        </p>
      </div>
      <form className="mt-3" onSubmit={e => onSubmit(e)}>
        <textarea
          rows="4"
          value={commentText}
          name="commentText"
          onChange={e => onChange(e)}
          placeholder={
            lang === 'rus'
              ? 'Оставьте свой отзыв если вам довелось сотрудничать с данным человеком'
              : 'Write something'
          }
        ></textarea>
        <button
          className="btn btn-info mt-2"
          type="submit"
          onChange={e => onChange(e)}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

ProfileAddComment.propTypes = {
  addComment: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
  lang: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  lang: state.lang,
  auth: state.auth
});

export default connect(mapStateToProps, { addComment, setAlert })(
  ProfileAddComment
);
