import React from 'react';
import PropTypes from 'prop-types';

const ProfileTop = ({
	profile: {
		profession,
		location,
		social,
		user: { name },
		avatar,
		phone,
	},
}) => {
	return (
		<div className="text-center bg-info profile-top">
			<h1></h1>
			<img className="img-thumbnail mb-1 mt-3" src={avatar} width="250" />
			<h4>{name}</h4>
			<h4>{profession}</h4>
			<div className="icons d-flex justify-content-center">
				{social && social.facebook && (
					<a href={social.facebook} target="_blank" rel="noopener noreferrer">
						<div className="profile-social-icon mb-2">
							<i className="fab fa-facebook fa-2x profile-social-icon" />
						</div>
					</a>
				)}
				{social && social.youtube && (
					<a href={social.youtube} target="_blank" rel="noopener noreferrer">
						<div className="profile-social-icon mb-2">
							<i className="fab fa-youtube fa-2x profile-social-icon" />
						</div>
					</a>
				)}
				{social && social.instagram && (
					<a href={social.instagram} target="_blank" rel="noopener noreferrer">
						<div className="profile-social-icon mb-2">
							<i className="fab fa-instagram fa-2x profile-social-icon" />
						</div>
					</a>
				)}
				{social && social.vk && (
					<a href={social.vk} target="_blank" rel="noopener noreferrer">
						<div className="profile-social-icon mb-2">
							<i className="fab fa-vk fa-2x profile-social-icon" />
						</div>
					</a>
				)}
			</div>
			<p>{phone && phone}</p>
		</div>
	);
};

ProfileTop.propTypes = {
	profile: PropTypes.object.isRequired,
};

export default ProfileTop;
