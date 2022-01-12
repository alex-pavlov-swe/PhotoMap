import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Footer from './Footer';
// import PropTypes from 'prop-types';
// import Footer from './Footer';

const PropTypes = require('prop-types');

function Home({ auth: { isAuthenticated, loading } }) {
    return (
        <Fragment>
            <div id="homeImage">
                <div className="container-fluid text-center">
                    <div className="row justify-content-center">
                        <span>
                            <h1>
                                Find locations where amazing photos have been taken
							</h1>
                            <div className="button-wrapper">
                                <span>
                                    {/* Earn rewards for posting your photos */}
                                </span>
                                <Link className="btn btn-light lift" to="/map">
                                    Explore the map
                                </Link>
                                <Link className="btn btn-light" to="/">
                                    Read the docs
                                </Link>
                            </div>
                        </span>
                    </div>
                </div>
            </div>
            <Footer positionClass={'absolute'}/>
        </Fragment>
    );
}

Home.propTypes = {
    auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    auth: state.auth,
});

export default connect(mapStateToProps)(Home);
