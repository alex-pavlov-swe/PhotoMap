import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';

const Navbar = ({ auth: { isAuthenticated, loading, user }, logout }) => {
  const authLinks = (
    <Fragment>
      <li className="nav-item">
        <Link className="nav-link" to="/map">
          Explore
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/feed">
          Feed
        </Link>
      </li>
      <li className="nav-item mr-4">
        <a className="nav-link" onClick={logout} href="/">
          Logout
        </a>
      </li>
      <li>
        {user && (<span><Link to="/profile"><img src={user.avatar} className="avatar-show-photo"/></Link></span>) }
      </li>
      <li>
        <Link className="btn btn-light" to="/upload" id="upload-link">
          <i className="fas fa-arrow-up"></i>
          Upload
        </Link>
      </li>
    </Fragment>
  );

  const guestLinks = (
    <Fragment>
      <li className="nav-item">
        <Link className="nav-link" to="/map">
          Map
        </Link>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="/register">
          Register
        </a>
      </li>
      <li className="nav-item mr-4">
        <a className="nav-link" href="/login">
          Login
        </a>
      </li>
      <li>
        <button className="btn btn-light">Upload</button>
      </li>
    </Fragment>
  );

  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-0">
      <Link className="navbar-brand" to="/">
        Photomap
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarMain"
        aria-controls="navbarMain"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarMain">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <form className="mr-4">
              <i className="fas fa-search"></i>
              <input type="text" placeholder="Enter a place" />
            </form>
          </li>
          <li className="nav-item dropdown" hidden>
            <a
              className="nav-link dropdown-toggle"
              href="#"
              id="navbarDropdown"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Dropdown
            </a>
            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
              <a className="dropdown-item" href="#">
                Action
              </a>
              <a className="dropdown-item" href="#">
                Another action
              </a>
              <div className="dropdown-divider"></div>
              <a className="dropdown-item" href="#">
                Something else here
              </a>
            </div>
          </li>
          {!loading && (
            <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
          )}
        </ul>
      </div>
    </nav>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {
  logout,
})(Navbar);
