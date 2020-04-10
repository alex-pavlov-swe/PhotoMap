import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from '../layout/Spinner';
import { getCurrentProfile } from '../../actions/profile';
import { Link } from 'react-router-dom';
import Feed from '../feed/Feed';

const Dashboard = ({
  getCurrentProfile,
  auth: { user },
  profile: { profile, loading },
  lang: { lang },
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);

  if ((loading && profile === null) || user === null) return <Spinner />;

  return <Feed />;
};

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  lang: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
  lang: state.lang,
});

export default connect(mapStateToProps, { getCurrentProfile })(Dashboard);
