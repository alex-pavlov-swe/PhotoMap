import React, { useEffect, useState, Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
	updateProfile,
	getCurrentProfile,
	uploadAvatar,
} from '../../actions/profile';
import Spinner from '../layout/Spinner';

const UpdateProfile = ({
	updateProfile,
	getCurrentProfile,
	uploadAvatar,
	auth: { user },
	profile: { profile, loading },
	history,
}) => {
	const [formData, setFormData] = useState({
		name: user.name,
		location: profile ? profile.location : '',
		description: profile ? profile.description : '',
		youtube: profile ? profile.social.youtube : '',
		facebook: profile ? profile.social.facebook : '',
		instagram: profile ? profile.social.instagram : '',
		web: profile ? profile.social.web : '',
		avatar: profile ? profile.avatar : '',
	});

	//const [displaySocialInputs, toggleSocialInputs] = useState(false);

	const {
		name,
		location,
		description,
		facebook,
		instagram,
		youtube,
		web,
		avatar,
	} = formData;

	const onChange = (e) =>
		setFormData({ ...formData, [e.target.name]: e.target.value });

	const onSubmit = (e) => {
		e.preventDefault();
		updateProfile(formData, history, false);
	};

	useEffect(() => {
		getCurrentProfile();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [getCurrentProfile]);

	const updateAvatarHandle = (e) => {
		document.getElementById('updateAvatarInput').click();
	};

	const updateAvatar = async (e) => {
		e.preventDefault();
		const file = e.target.files[0];
		const imageName = Math.round(Math.random() * 1000000000).toString();
		await uploadAvatar(file, imageName);

		const avatarUrl = `https://firebasestorage.googleapis.com/v0/b/photomap-9caa6.appspot.com/o/avatars%2F${imageName}?alt=media`;

		const updatedProfile = {
			avatar: avatarUrl,
		};

		await updateProfile(updatedProfile, history);
	};

	return loading && profile === null ? (
		<Spinner />
	) : (
		<Fragment>
			<div id="update-profile-container">
				<div className="row m-2 mb-4 mt-2">
					<div className="col-sm-10 offset-1">
						<h1>Update Your Profile</h1>
						<p>
							<i className="fas fa-user" />
							Lets get some information to make your profile stand out
						</p>
						<form className="form create-profile" onSubmit={(e) => onSubmit(e)}>
							<div className="form-group">
								<img src={avatar} width="200" className="img-thumbnail" />
							</div>
							<div className="form-group">
								<button
									type="button"
									className="btn btn-primary mt-2 mr-2"
									onClick={(e) => updateAvatarHandle(e)}
								>
									Change your profile picture
								</button>
								<input
									className="avatar-input"
									id="updateAvatarInput"
									type="file"
									onChange={(e) => updateAvatar(e)}
									hidden="true"
								/>
							</div>
							<div className="form-group">
								<input
									className="input-lg"
									type="text"
									placeholder="Location"
									name="location"
									value={location}
									onChange={(e) => onChange(e)}
								/>
								<small className="form-text">Where do you live</small>
							</div>
							<div className="form-group">
								<textarea
									type="text"
									placeholder="Describe yourself"
									rows="8"
									name="description"
									value={description}
									onChange={(e) => onChange(e)}
								/>
								<small className="form-text">
									Describe yourself, your skillls, professional experience and
									personal traits
								</small>
							</div>
							<div className="form-group">
								<input
									type="text"
									name="facebook"
									placeholder="Facebook link"
									value={facebook}
									onChange={(e) => onChange(e)}
								/>
								<small>A link to your facebook account if you have one</small>
							</div>
							<div className="form-group">
								<input
									type="text"
									name="youtube"
									placeholder="Youtube account"
									value={youtube}
									onChange={(e) => onChange(e)}
								/>
								<small>A link to your youtube account if you have one</small>
							</div>
							<div className="form-group">
								<input
									type="text"
									name="instagram"
									placeholder="instagram account"
									value={instagram}
									onChange={(e) => onChange(e)}
								/>
								<small>A link to your instagram account if you have one</small>
							</div>
							<button type="submit" className="btn btn-primary mt-2 mr-2">
								Save Changes
							</button>
							<Link className="btn btn-secondary mt-2" to="/dashboard">
								Cancel
							</Link>
						</form>
					</div>
				</div>
			</div>
		</Fragment>
	);
};

UpdateProfile.propTypes = {
	updateProfile: PropTypes.func.isRequired,
	getCurrentProfile: PropTypes.func.isRequired,
	uploadAvatar: PropTypes.func.isRequired,
	profile: PropTypes.object.isRequired,
	auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
	auth: state.auth,
	profile: state.profile,
});

export default connect(mapStateToProps, {
	updateProfile,
	getCurrentProfile,
	uploadAvatar,
})(withRouter(UpdateProfile));
