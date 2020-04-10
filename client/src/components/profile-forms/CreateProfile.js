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
    avatar: `https://firebasestorage.googleapis.com/v0/b/travel-link-f95ab.appspot.com/o/avatars%2Fno-img.png?alt=media`
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
      <div className="row m-2 mb-4 mt-2">
        <div className="col-sm-10 offset-1">
          <h1>{lang === 'rus' ? 'Создать профиль' : 'Create Your Profile'}</h1>
          <p>
            <i className="fas fa-user" />
            {lang === 'rus'
              ? 'Укажите как можно более полную информацию о себе, чтобы вас заметили'
              : 'Lets get some information to make your profile stand out'}
          </p>
          <form className="form create-profile" onSubmit={e => onSubmit(e)}>
            <div className="form-group">
              <select
                name="profession"
                value={profession}
                onChange={e => onChange(e)}
              >
                <option value="0">
                  {lang === 'rus'
                    ? '* Выберите свою профессию'
                    : '* Select Professional Status'}
                </option>
                <option value="Guide">
                  {lang === 'rus' ? 'Гид' : 'Guide'}
                </option>
                <option value="Cook">
                  {lang === 'rus' ? 'Повар' : 'Cook'}
                </option>
                <option value="Translator">
                  {lang === 'rus' ? 'Переводчик' : 'Translator'}
                </option>
                <option value="Driver">
                  {lang === 'rus' ? 'Водитель' : 'Driver'}
                </option>
                <option value="Volunteer">
                  {lang === 'rus' ? 'Волонтер' : 'Volunteer'}
                </option>
              </select>
              <small className="form-text">
                {lang === 'rus'
                  ? 'Какие позиции рассматриваете'
                  : 'What job position are you looking for'}
              </small>
            </div>
            <div className="form-group">
              <input
                className="input-lg"
                type="text"
                placeholder={lang === 'rus' ? 'Откуда вы' : 'Location'}
                name="location"
                value={location}
                onChange={e => onChange(e)}
              />
              <small className="form-text">
                {lang === 'rus' ? 'Где вы живете' : 'Where do you live'}
              </small>
            </div>
            <div className="form-group">
              <textarea
                type="text"
                placeholder={lang === 'rus' ? 'Районы Камчатки' : 'Regions'}
                rows="2"
                name="regions"
                value={regions}
                onChange={e => onChange(e)}
              />
              <small>
                {lang === 'rus'
                  ? 'Какие районы Камчатки вы знаете и где можете работать'
                  : 'Which regions of Kamchatka you are familiar with'}
              </small>
            </div>
            <div className="form-group">
              <textarea
                type="text"
                placeholder={
                  lang === 'rus'
                    ? 'Опишите себя и свои услуги'
                    : 'Describe yourself'
                }
                rows="8"
                name="description"
                value={description}
                onChange={e => onChange(e)}
              />
              <small className="form-text">
                {lang === 'rus'
                  ? 'Любая как можно более подробная информация об вашем опыте, квалификации, снаряжении, транспортном стредстве, датах когда свободны и готовы работать'
                  : 'Describe yourself, your skillls, professional experience and personal traits'}
              </small>
            </div>
            <div className="form-group">
              <textarea
                type="text"
                name="education"
                rows="2"
                placeholder={
                  lang === 'rus'
                    ? 'Образование (не обязательно)'
                    : 'Your education'
                }
                value={education}
                onChange={e => onChange(e)}
              />
              <small>
                {lang === 'rus'
                  ? 'При желании можете указать - где и как учились, может проходили какие-то курсы'
                  : 'Where have you studied - college, courses if any'}
              </small>
            </div>
            <div className="form-group">
              <input
                type="text"
                name="age"
                placeholder={
                  lang === 'rus' ? 'Ваш возраст (не обязательно)' : 'your age'
                }
                value={age}
                onChange={e => onChange(e)}
              />
              <small>
                {lang === 'rus'
                  ? 'При желании можете указать сколько вам лет'
                  : 'How old are you'}
              </small>
            </div>
            <div className="form-group">
              <input
                type="text"
                name="facebook"
                placeholder={
                  lang === 'rus' ? 'ссылка на фейсбук' : 'facebook link'
                }
                value={facebook}
                onChange={e => onChange(e)}
              />
              <small>
                {lang === 'rus'
                  ? 'Ссылка на профиль в фейсбуке (если есть)'
                  : 'A link to your facebook account if you have one'}
              </small>
            </div>
            <div className="form-group">
              <input
                type="text"
                name="youtube"
                placeholder={
                  lang === 'rus' ? 'ссылка на ютьюб' : 'youtube account'
                }
                value={youtube}
                onChange={e => onChange(e)}
              />
              <small>
                {lang === 'rus'
                  ? 'ссылка на профиль в фейсбуке (если есть)'
                  : 'A link to your youtube account if you have one'}
              </small>
            </div>
            <div className="form-group">
              <input
                type="text"
                name="instagram"
                placeholder={
                  lang === 'rus' ? 'ссылка на инстаграм' : 'instagram account'
                }
                value={instagram}
                onChange={e => onChange(e)}
              />
              <small>
                {lang === 'rus'
                  ? 'ссылка на профиль в инстаграме (если есть)'
                  : 'A link to your instagram account if you have one'}
              </small>
            </div>
            <button type="submit" className="btn btn-primary mt-2 mr-2">
              {lang === 'rus' ? 'Сохранить' : 'Save Changes'}
            </button>
            <Link className="btn btn-secondary mt-2" to="/dashboard">
              {lang === 'rus' ? 'Отменить' : 'Cancel'}
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
  profile: PropTypes.object.isRequired,
  lang: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  profile: state.profile,
  lang: state.lang
});

export default connect(mapStateToProps, { updateProfile, getCurrentProfile })(
  withRouter(CreateProfile)
);
