import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';

const Navbar = ({ auth: { isAuthenticated, loading, user }, profile: { profile }, logout }) => {
    const authLinks = (
        <Fragment>
            <li>
                {user && profile && (
                    <span>
                        <Link to={`/profile/${profile.user._id}`} onClick={() => closeMobileMenu()}>
                            <img src={profile.avatar ? profile.avatar : user.avatar} className="avatar-show-photo" />
                        </Link>
                    </span>
                )}
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/map" onClick={() => closeMobileMenu()}>
                    Map
                    </Link>
            </li>
            {/* <li className="nav-item">
                <Link className="nav-link" to="/feed" onClick={() => closeMobileMenu()}>
                    What's New
                    </Link>
            </li> */}
            {/* <li className="nav-item">
                <Link className="nav-link" to="/about" onClick={() => closeMobileMenu()}>
                    About
                    </Link>
            </li> */}
            <li className="nav-item mr-4">
                <Link className="nav-link" onClick={() => handleLogout()} to="/">
                    Logout
                </Link>
            </li>
            <li>
                <Link className="btn btn-light" to="/upload" id="upload-link" onClick={() => closeMobileMenu()}>
                    <i className="fas fa-arrow-up"></i>
                        Upload
                    </Link>
            </li>
        </Fragment>
    );

    const guestLinks = (
        <Fragment>
            <li className="nav-item">
                <Link className="nav-link" to="/map" onClick={() => closeMobileMenu()}>
                    Map
                    </Link>
            </li>
            {/* <li className="nav-item">
                <Link className="nav-link" to="/feed" onClick={() => closeMobileMenu()}>
                    What's New
                </Link>
            </li> */}
            {/* <li className="nav-item">
                <Link className="nav-link" to="/about" onClick={() => closeMobileMenu()}>
                    About
                    </Link>
            </li> */}
            <li className="nav-item mr-4">
                <Link className="nav-link" to="/login" onClick={() => closeMobileMenu()}>
                    Sing In
                </Link>
            </li>
        </Fragment>
    );

    const closeMobileMenu = () => {
        document.getElementById('navbarMain').classList.remove('show');
    }

    const handleLogout = () => {
        closeMobileMenu();
        logout();
    }

    return (
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-0">
            <Link className="navbar-brand" to="/" onClick={() => closeMobileMenu()}>
                Photomap.io
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
                    {/* <li className="nav-item">
                        <form className="mr-4 mt-2 searchContainer">
                            <i className="fas fa-search"></i>
                            <input type="text" placeholder="Enter a place" />
                        </form>
                    </li> */}
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
    profile: state.profile
});

export default connect(mapStateToProps, {
    logout,
})(Navbar);
