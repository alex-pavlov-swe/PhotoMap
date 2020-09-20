import React, { useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getProfileById } from '../../actions/profile';
import Spinner from '../../components/layout/Spinner';
import ProfileTop from './ProfileTop';
import ProfileAddReview from '../reviews/ProfileAddReview';
import Reviews from '../reviews/Reviews';

const Profile = ({
	getProfileById,
	profile: { profile, loading },
	auth,
	match,
	lang: { lang },
}) => {
	useEffect(() => {
		getProfileById(match.params.id);
		// eslint-disable-next-line
	}, [getProfileById]);
	return (
		<Fragment>
			{profile === null || loading ? (
				<Spinner />
			) : (
				<Fragment>
					<div className="row mt-4 mb-4 full-page">
						<div className="col-sm-10 offset-1">
							<Link className="btn btn-info mb-4" to="/profiles">
								{lang === 'rus' ? 'Назад к списку' : 'Back to Profiles'}
							</Link>
							{auth.isAuthenticated &&
								auth.loading === false &&
								auth.user._id === profile.user._id && (
									<Link className="btn btn-info ml-4 mb-4" to="/update_profile">
										{lang === 'rus' ? 'Редактировать' : 'Edit Profile'}
									</Link>
								)}
							<ProfileTop profile={profile} />
							<p className="mt-4">{profile.description}</p>
							<p>
								<strong>Location:</strong>
								{profile.location}
							</p>
							{/*
              <Reviews
                lang={lang}
                profileId={match.params.id}
                profileName={profile.user.name}
              />
              <ProfileAddReview lang={lang} profileId={match.params.id} />
              */}
						</div>
					</div>
				</Fragment>
			)}
		</Fragment>
	);
};

Profile.propTypes = {
	getProfileById: PropTypes.func.isRequired,
	profile: PropTypes.object.isRequired,
	auth: PropTypes.object.isRequired,
	lang: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	profile: state.profile,
	auth: state.auth,
	lang: state.lang,
});

export default connect(mapStateToProps, { getProfileById })(Profile);
