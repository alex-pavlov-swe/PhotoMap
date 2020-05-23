import React, { Fragment } from 'react';
import LoginForm from './LoginForm';

const Auth = () => {
  return (
    <Fragment>
      <div id="auth">
        <div className="container-fluid text-center">
          <div className="row justify-content-center">
            <LoginForm />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Auth;
