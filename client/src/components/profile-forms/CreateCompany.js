import React, { useEffect, useState, Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { updateProfile, getCurrentProfile } from '../../actions/profile';
import Spinner from '../layout/Spinner';

const CreateProfile = ({
  updateProfile,
  getCurrentProfile,
  profile: { profile, loading },
  lang: { lang },
  history
}) => {
  const [formData, setFormData] = useState({
    profession: '',
    location: '',
    regions: '',
    description: '',
    education: '',
    age: '',
    youtube: '',
    facebook: '',
    instagram: '',
    avatar: `https://firebasestorage.googleapis.com/v0/b/travel-link-f95ab.appspot.com/o/avatars%2Fno-img?alt=media`
  });

  //const [displaySocialInputs, toggleSocialInputs] = useState(false);

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
    avatar
  } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
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
      <div className="row m-2 mb-4 mt-3">
        <div className="col-sm-10 offset-1">
          <h1>
            {lang === 'rus'
              ? 'Создайте профиль Вашей компании'
              : 'Create the Profile of your company'}{' '}
          </h1>
          <p>
            <i className="fas fa-user" />
            {lang === 'rus'
              ? 'Базовая информация о Вашей компании поможет потенциальным клиентам сделать выбор'
              : 'Lets get some information to make your profile stand out'}
          </p>
          <div className="form-group">
            <input
              className="input-lg"
              type="text"
              placeholder={
                lang === 'rus' ? 'Название компании' : 'Name of the company'
              }
              name="location"
              value={location}
              onChange={e => onChange(e)}
            />
            <small className="form-text">
              {lang === 'rus'
                ? 'Официальное наименование'
                : 'The official name'}
            </small>
          </div>
          <div className="form-group">
            <input
              className="input-lg"
              type="text"
              placeholder={
                lang === 'rus' ? 'Контактный телефон' : 'Phone number'
              }
              name="location"
              value={location}
              onChange={e => onChange(e)}
            />
            <small className="form-text">
              {lang === 'rus'
                ? 'Номер по которому с вами можно связаться'
                : 'How clients can reach you'}
            </small>
          </div>
          <form className="form create-profile" onSubmit={e => onSubmit(e)}>
            <div className="form-group">
              <input
                className="input-lg"
                type="text"
                placeholder={
                  lang === 'rus' ? 'Адрес компании' : 'Address of the company'
                }
                name="location"
                value={location}
                onChange={e => onChange(e)}
              />
              <small className="form-text">
                {lang === 'rus'
                  ? 'Где находится офис вашей компании'
                  : 'Where is the office of your company'}
              </small>
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
};

CreateProfile.propTypes = {
  udpateProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  profile: state.profile,
  lang: state.lang
});

export default connect(mapStateToProps, { updateProfile, getCurrentProfile })(
  withRouter(CreateProfile)
);
