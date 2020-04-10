import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  getCurrentProfile,
  updateProfile,
  uploadAvatar
} from '../../actions/profile';
import { withRouter } from 'react-router-dom';
import Spinner from '../layout/Spinner';
import { Link } from 'react-router-dom';
//import { setAlert } from '../../actions/alert';
//import { isError } from 'util';

function EditProfile({
  getCurrentProfile,
  updateProfile,
  uploadAvatar,
  auth: { user },
  profile: { profile, loading },
  history
}) {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);

  const [formData, setFormData] = useState({
    name: user.name,
    profession: profile.profession,
    location: profile.location,
    regions: profile.regions,
    description: profile.description,
    education: profile.education,
    age: profile.age,
    youtube: profile.social.youtube,
    facebook: profile.social.facebook,
    instagram: profile.social.instagram,
    vk: profile.social.vk,
    avatar: profile.avatar,
    phone: profile.phone
  });

  const {
    profession,
    location,
    regions,
    description,
    education,
    age,
    youtube,
    facebook,
    instagram,
    vk,
    avatar,
    phone
  } = formData;

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async e => {
    e.preventDefault();

    const updatedProfile = {
      profession: profession,
      location: location,
      regions: regions,
      description: description,
      education: education,
      age: age,
      youtube: youtube,
      facebook: facebook,
      instagram: instagram,
      vk: vk,
      avatar: avatar,
      phone: phone
    };

    await updateProfile(updatedProfile, history);
  };

  const updateAvatarHandle = e => {
    document.getElementById('updateAvatarInput').click();
  };

  const updateAvatar = async e => {
    e.preventDefault();
    const file = e.target.files[0];
    const imageName = Math.round(Math.random() * 1000000000).toString();
    await uploadAvatar(file, imageName);

    const avatarUrl = `https://firebasestorage.googleapis.com/v0/b/travel-link-f95ab.appspot.com/o/avatars%2F${imageName}?alt=media`;

    const updatedProfile = {
      profession: profession,
      location: location,
      regions: regions,
      description: description,
      education: education,
      age: age,
      youtube: youtube,
      facebook: facebook,
      instagram: instagram,
      vk: vk,
      avatar: avatarUrl,
      phone: phone
    };

    await updateProfile(updatedProfile, history);
  };

  if (loading || profile === null || user === null) return <Spinner />;

  return (
    <Fragment>
      <div className="row m-2 mb-4">
        <div className="col-sm-12 col-md-10 offset-md-1">
          <h1>Update Your Profile</h1>
          <p>
            <i className="fas fa-user" /> Let's get some information to make
            your profile stand out
          </p>
          <form className="form edit-profile" onSubmit={e => onSubmit(e)}>
            <div className="form-group">
              <img src={avatar} width="200" className="img-thumbnail" />
            </div>
            <div className="form-group">
              <button
                type="button"
                className="btn btn-primary mt-2 mr-2"
                onClick={e => updateAvatarHandle(e)}
              >
                Change your profile picture
              </button>
              <input
                className="avatar-input"
                id="updateAvatarInput"
                type="file"
                onChange={e => updateAvatar(e)}
              />
            </div>
            <div className="form-group">
              <select
                name="profession"
                value={profession}
                onChange={e => onChange(e)}
              >
                <option value="0">* Select Professional Status</option>
                <option value="Guide">Guide</option>
                <option value="Cook">Cook</option>
                <option value="Translator">Translator</option>
              </select>
              <small className="form-text">
                What job position are you looking for
              </small>
            </div>
            <div className="form-group">
              <input
                className="input-lg"
                type="text"
                placeholder="phone"
                name="phone"
                value={phone}
                onChange={e => onChange(e)}
              />
              <small className="form-text">Your phone number</small>
            </div>
            <div className="form-group">
              <input
                className="input-lg"
                type="text"
                placeholder="Location"
                name="location"
                value={location}
                onChange={e => onChange(e)}
              />
              <small className="form-text">Where do you live</small>
            </div>
            <div className="form-group">
              <textarea
                type="text"
                placeholder="Regions"
                rows="2"
                name="regions"
                value={regions}
                onChange={e => onChange(e)}
              />
              <small>Which regions of Kamchatka you are familiar with</small>
            </div>
            <div className="form-group">
              <textarea
                type="text"
                placeholder="Describe yourself"
                rows="8"
                name="description"
                value={description}
                onChange={e => onChange(e)}
              />
              <small className="form-text">
                Describe yourself, your skillls, professional experience and
                personal traits
              </small>
            </div>
            <div className="form-group">
              <textarea
                type="text"
                name="education"
                rows="2"
                placeholder="Your education"
                value={education}
                onChange={e => onChange(e)}
              />
              <small>Where have you studied - college, courses if any</small>
            </div>
            <div className="form-group">
              <input
                type="text"
                name="age"
                placeholder="your age"
                value={age}
                onChange={e => onChange(e)}
              />
              <small>How old are you</small>
            </div>
            <div className="form-group">
              <input
                type="text"
                name="facebook"
                placeholder="facebook link"
                value={facebook}
                onChange={e => onChange(e)}
              />
              <small>A link to your facebook account if you have one</small>
            </div>
            <div className="form-group">
              <input
                type="text"
                name="youtube"
                placeholder="youtube account"
                value={youtube}
                onChange={e => onChange(e)}
              />
              <small>A link to your youtube chanel if you have one</small>
            </div>
            <div className="form-group">
              <input
                type="text"
                name="instagram"
                placeholder="instagram link"
                value={instagram}
                onChange={e => onChange(e)}
              />
              <small>A link to your instagram account if you have one</small>
            </div>
            <div className="form-group">
              <input
                type="text"
                name="vk"
                placeholder="vk link"
                value={vk}
                onChange={e => onChange(e)}
              />
              <small>A link to your vk account if you have one</small>
            </div>
            <button type="submit" className="btn btn-primary mt-2 mr-2">
              Save changes
            </button>
            <Link className="btn btn-secondary mt-2" to="/dashboard">
              Cancel
            </Link>
          </form>
        </div>
      </div>
    </Fragment>
  );
}

EditProfile.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  updateProfile: PropTypes.func.isRequired,
  uploadAvatar: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(mapStateToProps, {
  getCurrentProfile,
  updateProfile,
  uploadAvatar
})(withRouter(EditProfile));
