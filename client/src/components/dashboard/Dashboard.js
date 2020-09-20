import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from '../layout/Spinner';
import { getCurrentProfile } from '../../actions/profile';
import { Link } from 'react-router-dom';

const Dashboard = ({
	getCurrentProfile,
	auth: { user },
	profile: { profile, loading },
}) => {
	useEffect(() => {
		getCurrentProfile();
	}, [getCurrentProfile]);

	var lang = 'eng';

	if ((loading && profile === null) || user === null) return <Spinner />;

	return (
		<Fragment>
			<div className="row mt-2 mb-2 full-page">
				<div className="col-sm-10 offset-1">
					<p>
						<strong>{user.name}</strong>
					</p>
					{profile !== null ? (
						<Fragment>
							<p>
								<img
									className="img-thumbnail"
									src={profile.avatar}
									alt="profileImage"
									width="200"
								/>
							</p>
							<p>{profile.description}</p>
							<p>
								<strong>Location: </strong>
								{profile.location}
							</p>

							<Link
								className="btn btn-primary mr-2 mt-2 mb-3"
								to="/update_profile"
							>
								Update Profile
							</Link>
						</Fragment>
					) : (
						<Fragment>
							<p>
								<Link className="btn btn-primary mt-2" to="/update_profile">
									Update Profile
								</Link>
							</p>
						</Fragment>
					)}
				</div>
			</div>
		</Fragment>
	);
};

Dashboard.propTypes = {
	getCurrentProfile: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	auth: state.auth,
	profile: state.profile,
});

export default connect(mapStateToProps, { getCurrentProfile })(Dashboard);
