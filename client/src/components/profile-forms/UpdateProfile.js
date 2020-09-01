import React, { useEffect, useState, Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { updateProfile, getCurrentProfile } from '../../actions/profile';
import Spinner from '../layout/Spinner';

const UpdateProfile = ({
  updateProfile,
  getCurrentProfile,
  profile: { profile, loading },
  history,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    location: profile.location,
    description: '',
    facebook: '',
    instagram: '',
    youtube: '',
    web: '',
    avatar: `https://firebasestorage.googleapis.com/v0/b/travel-link-f95ab.appspot.com/o/avatars%2Fno-img.png?alt=media`,
  });

  //const [displaySocialInputs, toggleSocialInputs] = useState(false);

  const {
    name,
    location,
    description,
    facebook,
    instagram,
    youtube,
    web,
    avatar,
  } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    updateProfile(formData, history, false);
  };

  useEffect(() => {
    getCurrentProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getCurrentProfile]);

  return loading && profile === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <div id="update-profile-container">
        <div className="row m-2 mb-4 mt-2">
          <div className="col-sm-10 offset-1">
            <h1>Update Your Profile</h1>
            <p>
              <i className="fas fa-user" />
              Lets get some information to make your profile stand out
            </p>
            <form className="form create-profile" onSubmit={(e) => onSubmit(e)}>
              <div className="form-group">
                <input
                  className="input-lg"
                  type="text"
                  placeholder="Location"
                  name="location"
                  value={location}
                  onChange={(e) => onChange(e)}
                />
                <small className="form-text">Where do you live</small>
              </div>
              <div className="form-group">
                <textarea
                  type="text"
                  placeholder="Describe yourself"
                  rows="8"
                  name="description"
                  value={description}
                  onChange={(e) => onChange(e)}
                />
                <small className="form-text">
                  Describe yourself, your skillls, professional experience and
                  personal traits
                </small>
              </div>
              <div className="form-group">
                <input
                  type="text"
                  name="facebook"
                  placeholder="Facebook link"
                  value={facebook}
                  onChange={(e) => onChange(e)}
                />
                <small>A link to your facebook account if you have one</small>
              </div>
              <div className="form-group">
                <input
                  type="text"
                  name="youtube"
                  placeholder="Youtube account"
                  value={youtube}
                  onChange={(e) => onChange(e)}
                />
                <small>A link to your youtube account if you have one</small>
              </div>
              <div className="form-group">
                <input
                  type="text"
                  name="instagram"
                  placeholder="instagram account"
                  value={instagram}
                  onChange={(e) => onChange(e)}
                />
                <small>A link to your instagram account if you have one</small>
              </div>
              <button type="submit" className="btn btn-primary mt-2 mr-2">
                Save Changes
              </button>
              <Link className="btn btn-secondary mt-2" to="/dashboard">
                Cancel
              </Link>
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

UpdateProfile.propTypes = {
  udpateProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { updateProfile, getCurrentProfile })(
  withRouter(UpdateProfile)
);
