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
		if (auth.user) {
			photosAllByProfileGET(auth.user._id);
		}
	}, [photosAllByProfileGET])
	return (
		<Fragment>
			{auth.loading || profile.loading ? (
				<Spinner/>
			) : (
				<Fragment>
					<h3>All Photos by {auth.user ? auth.user.name : ''}</h3>
					{profile.photos.length > 0 ? (
						profile.photos
							.map((photo) => (
								<ProfilePhotoItem
									key={photo._id}
									url={photo.url}
									title={photo.title}
								/>
							))
					) : (
						<div>You are no authorized or don't have any photos yet</div>
					)}
				</Fragment>
			)}
		</Fragment>
	)
};

PhotosAllByProfile.propTypes = {
	photosAllByProfileGET: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	profil: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
	profile: state.profile,
	auth: state.auth
});

export default connect(mapStateToProps, {photosAllByProfileGET})(PhotosAllByProfile);
