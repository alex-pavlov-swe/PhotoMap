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
                        <h3>Currently unavailable on mobile</h3>
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
