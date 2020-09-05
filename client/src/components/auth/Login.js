import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { login } from '../../actions/auth';
import PropTypes from 'prop-types';
import { Redirect, Link } from 'react-router-dom';
import Footer from '../layout/Footer';

function Login({ login, isAuthenticated, lang: { lang } }) {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  useEffect(() => {
    if (document.getElementById('login-form')) {
      document.getElementById('login-form').classList.add('show');
    }
  }, []);

  const { email, password } = formData;

  const onSubmit = (e) => {
    e.preventDefault();
    login({ email, password });
  };

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Redirect if logged in
  if (isAuthenticated) {
    return <Redirect to="/feed" />;
  }

  return (
    <Fragment>
      <div className="container-fluid" id="login">
        <div className="row">
          <div className="col-sm-12 text-center">
            <form
              className="form hide"
              onSubmit={(e) => onSubmit(e)}
              id="login-form"
            >
              <h3>
                <i className="fas fa-user mb-3" />
                {lang === 'rus' ? 'Войти в аккаунт' : 'Log in'}
              </h3>
              <div className="form-group">
                <input
                  type="text"
                  name="email"
                  value={email}
                  onChange={(e) => onChange(e)}
                  required
                  placeholder={
                    lang === 'rus' ? 'Введите e-mail' : 'Enter your email'
                  }
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  name="password"
                  value={password}
                  onChange={(e) => onChange(e)}
                  required
                  placeholder={
                    lang === 'rus' ? 'Введите пароль' : 'Enter your password'
                  }
                />
              </div>
              <div className="form-group">
                <button className="btn btn-primary mt-1 mb-4" type="submit">
                  {lang === 'rus' ? 'Войти' : 'Sign in'}
                </button>
              </div>
              <p>
                {lang === 'rus' ? 'Еще нет аккаунта?' : 'Not a member?'}{' '}
                <Link to="register">
                  {lang === 'rus' ? 'Создайте его.' : 'Sign up here.'}
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </Fragment>
  );
}

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  language: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  lang: state.lang,
});

export default connect(mapStateToProps, { login })(Login);
