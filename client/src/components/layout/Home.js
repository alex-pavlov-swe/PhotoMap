import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
// import Footer from './Footer';


const PropTypes = require('prop-types');
const Footer = require('./Footer');

function Home({ auth: { isAuthenticated, loading } }) {
    return (
        <Fragment>
            <div id="homeImage">
                <div className="container-fluid text-center">
                    <div className="row justify-content-center">
                        <span>
                            <h1>Photomap</h1>
                            <h4>
                                Find the exact locations where amazing photos have been taken
							</h4>
                            <Link className="btn btn-light mt-3" to="/map">
                                Explore
							</Link>
                        </span>
                    </div>
                </div>
            </div>
            {/* <Footer /> */}
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
