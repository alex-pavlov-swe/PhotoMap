import React, { useEffect, Fragment } from 'react';
import { photosAllByProfileGET } from '../../actions/photo/photosAllByProfileGET';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import Spinner from '../../components/layout/Spinner';
import ProfilePhotoItem from './ProfilePhotoItem';

const PhotosAllByProfile = ({
	photosAllByProfileGET,
	auth,
	profile
}) => {
	useEffect(() => {
			photosAllByProfileGET(profile.profile.user._id);
	}, [photosAllByProfileGET])
	return (
		<Fragment>
			{auth.loading || profile.loading ? (
				<Spinner/>
			) : (
				<Fragment>
					<h3>All Photos by {auth.user ? auth.user.name : ''}</h3>
					<div className="profile-photo-items-container">
						{profile.photos.length > 0 ? (
							profile.photos
								.map((photo) => (
									<ProfilePhotoItem
										key={photo._id}
										photo={photo}
									/>
								))
						) : (
							<div>You are not authorized or don't have any photos yet</div>
						)}
					</div>
				</Fragment>
			)}
		</Fragment>
	)
};

PhotosAllByProfile.propTypes = {
	photosAllByProfileGET: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	profile: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
	profile: state.profile,
	auth: state.auth
});

export default connect(mapStateToProps, {photosAllByProfileGET})(PhotosAllByProfile);
