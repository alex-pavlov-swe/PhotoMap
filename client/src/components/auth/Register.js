import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';
import PropTypes from 'prop-types';

function Register({ setAlert, register, isAuthenticated, lang: { lang } }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  });

  const { name, email, password, password2 } = formData;

  const onSubmit = async e => {
    e.preventDefault();

    if (password !== password2) {
      setAlert('Passwords do not match', 'danger', 3600);
    } else {
      register({ name, email, password });
    }
  };

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Redirect if logged in
  if (isAuthenticated) {
    return <Redirect to="/" />;
  }

  return (
    <Fragment>
      <div className="row mt-2 mb-2 full-page">
        <div className="col-md-6 offset-md-3 col-sm-12">
          <form className="form" onSubmit={e => onSubmit(e)}>
            <h3>
              <i className="fas fa-user" />
              {lang === 'rus' ? 'Создать аккаунт' : 'Create Your Account'}
            </h3>
            <div className="form-group">
              <label htmlFor="name">{lang === 'rus' ? 'Имя' : 'Name'}</label>
              <input
                className="form-control"
                type="text"
                name="name"
                value={name}
                onChange={e => onChange(e)}
                required
                placeholder={
                  lang === 'rus' ? 'Как Вас зовут' : 'Enter your name'
                }
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                className="form-control"
                type="text"
                name="email"
                value={email}
                onChange={e => onChange(e)}
                required
                placeholder={
                  lang === 'rus'
                    ? 'Введите Ваш адрес электронной почты'
                    : 'Enter your email'
                }
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">
                {lang === 'rus' ? 'Пароль' : 'Password'}
              </label>
              <input
                className="form-control"
                type="text"
                name="password"
                value={password}
                onChange={e => onChange(e)}
                required
                minLength="6"
                placeholder={
                  lang === 'rus' ? 'Введите пароль' : 'Enter your password'
                }
              />
            </div>
            <div className="form-group">
              <label htmlFor="name">
                {lang === 'rus' ? 'Подтвердить пароль' : 'Confirm password'}
              </label>
              <input
                className="form-control"
                type="text"
                name="password2"
                value={password2}
                onChange={e => onChange(e)}
                required
                minLength="6"
                placeholder={
                  lang === 'rus'
                    ? 'Введите пароль еще раз'
                    : 'Repeat your password'
                }
              />
            </div>
            <button className="btn btn-info mt-1 mb-4" type="submit">
              {lang === 'rus' ? 'Зарегистрироваться' : 'Register'}
            </button>
          </form>
          <p>
            {lang === 'rus' ? 'Уже есть аккаунт?' : 'Already have an account?'}
            <Link to="/login"> {lang === 'rus' ? 'Войти' : 'Sign in'}</Link>
          </p>
        </div>
      </div>
    </Fragment>
  );
}

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  lang: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  lang: state.lang
});

export default connect(mapStateToProps, { setAlert, register })(Register);
