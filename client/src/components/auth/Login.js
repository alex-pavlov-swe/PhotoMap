import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { login } from '../../actions/auth';
import PropTypes from 'prop-types';
import { Redirect, Link } from 'react-router-dom';

function Login({ login, isAuthenticated, lang: { lang } }) {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const { email, password } = formData;

  const onSubmit = e => {
    e.preventDefault();
    login({ email, password });
  };

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Redirect if logged in
  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <Fragment>
      <div className="row mt-4 mb-2 login-container full-page">
        <div className="col-md-6 offset-md-3 col-sm-12">
          <form className="form" onSubmit={e => onSubmit(e)}>
            <h3>
              <i className="fas fa-user" />
              {lang === 'rus' ? 'Войти в аккаунт' : 'Log in'}
            </h3>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                name="email"
                value={email}
                onChange={e => onChange(e)}
                required
                placeholder={
                  lang === 'rus' ? 'Введите e-mail' : 'Enter your email'
                }
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">
                {lang === 'rus' ? 'Пароль' : 'Password'}
              </label>
              <input
                type="text"
                name="password"
                value={password}
                onChange={e => onChange(e)}
                required
                placeholder={
                  lang === 'rus' ? 'Введите пароль' : 'Enter your password'
                }
              />
            </div>
            <button className="btn btn-info mt-1 mb-4" type="submit">
              {lang === 'rus' ? 'Войти' : 'Submit'}
            </button>
            <p>
              {lang === 'rus'
                ? 'У Вас еще нет аккаунта?'
                : 'Dont have an account?'}{' '}
              <Link to="register">
                {lang === 'rus' ? 'Создайте его,' : 'Create one'}
              </Link>{' '}
              {lang === 'rus'
                ? 'чтобы туркомпании могли с Вами связаться.'
                : 'to submit your profile and start being visible for potential employers'}
            </p>
          </form>
          <p>
            {lang === 'rus'
              ? 'Нащ сервис может помочь начти работу следующим категориям:'
              : ''}
          </p>
          <p>
            {lang === 'rus'
              ? 'гид, повар, переводчик, помощник гида, волотнер, водитель вахтовки, автобуса, джипа, микроавтобуса, водитель-гид на легковом автомобиле.'
              : ''}
          </p>
        </div>
      </div>
    </Fragment>
  );
}

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  language: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  lang: state.lang
});

export default connect(mapStateToProps, { login })(Login);
