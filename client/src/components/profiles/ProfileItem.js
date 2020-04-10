import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
// eslint-disable-next-line
const ProfileItem = ({ profile: profile, lang: lang }) => {
  return (
    <div className="card m-4">
      <div className="card-header">
        <h4>
          {profile.user.name}, {profile.profession}
        </h4>
      </div>
      <div className="card-body">
        <img className="img-thumbnail mb-2" src={profile.avatar} width="200" />
        <div className="card-text">{profile.description}</div>
        <Link className="btn btn-info mt-3" to={`/profile/${profile.user._id}`}>
          {lang === 'rus' ? 'Открыть профиль' : 'View Profile'}
        </Link>
      </div>
    </div>
  );
};

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired,
  lang: PropTypes.string.isRequired
};

export default ProfileItem;
