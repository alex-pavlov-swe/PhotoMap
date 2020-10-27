import React, { useEffect, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getPhotoById } from '../../actions/photo/currentPhotoGET';
import { deletePhotoFromFirebase } from '../../actions/photoUpload/photoDeleteFirebase';
import { deletePhotoFromMongo } from '../../actions/photoUpload/photoDeleteMongo';
import { updatePhotoMongo } from '../../actions/photoUpload/photoUpdateMongo';
import Spinner from '../layout/Spinner';

const UpdatePhoto = ({
	currentPhoto: { photo, loading },
	auth: { user },
	getPhotoById,
	updatePhotoMongo,
	deletePhotoFromFirebase,
	deletePhotoFromMongo,
	match,
	history,
}) => {
	useEffect(() => {
		getPhotoById(match.params.id);
	}, [getPhotoById]);

	const [formData, setFormData] = useState({
		id: photo._id,
		url: photo.url,
		imageName: photo.imageName,
		name: user.name,
		avatar: user.avatar,
		title: photo.title,
		description: photo.description,
		camera: '',
		focalLength: '',
		shutterSpeed: '',
		ISO: '',
		keywords: '',
	});

	const {
		id,
		url,
		imageName,
		title,
		description,
		camera,
		focalLength,
		shutterSpeed,
		ISO,
		keywords,
	} = formData;

	const uploadHandle = (e) => {
		e.preventDefault();
		updatePhotoMongo(formData, history);
	};

	const onChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	return loading === true ? (
		<Spinner />
	) : (
		<div className="container-fluid" id="updatePhoto">
			<div className="row m-4">
				<div className="col-md-3 m-1 mr-auto text-center">
					<img src={url} alt="uploading a photo" className="width-10" />
				</div>
				<div className="col-md-8 m-1">
					<form>
						<div className="form-group">
							<label htmlFor="title">Title</label>
							<input
								value={title}
								type="text"
								className="form-control"
								name="title"
								placeholder="e.g. Cherry Blossom trees in Vancouver"
								onChange={(e) => onChange(e)}
							/>
						</div>
						<div className="form-group">
							<label htmlFor="description">Description</label>
							<textarea
								value={description}
								type="text"
								className="form-control"
								name="description"
								rows="5"
								placeholder="e.g. Early April, Sequoia road in Burnaby, British Columbia, beautiful cherry blossoms."
								onChange={(e) => onChange(e)}
							/>
						</div>
						<div className="form-group">
							<label htmlFor="keywords">Keywords</label>
							<textarea
								value={keywords}
								type="text"
								className="form-control"
								name="keywords"
								rows="5"
								placeholder="cherry blossoms, Vancouver, Brithis Columbia, Beauty in Nature, Spring, Nature, Beautiful city"
								onChange={(e) => onChange(e)}
							/>
						</div>
						<div className="form-group">
							<button
								className="btn btn-primary mr-2"
								type="button"
								onClick={(e) => uploadHandle(e)}
							>
								Update
							</button>
							<Link
								to={`/photo/${photo._id}`}
								className="btn btn-light"
								type="button"
							>
								Cancel
							</Link>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

UpdatePhoto.propTypes = {
	auth: PropTypes.object.isRequired,
	currentPhoto: PropTypes.object.isRequired,
	updatePhotoMongo: PropTypes.func.isRequired,
	getPhotoById: PropTypes.func.isRequired,
	deletePhotoFromFirebase: PropTypes.func.isRequired,
	deletePhotoFromMongo: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	auth: state.auth,
	currentPhoto: state.currentPhoto,
});

export default connect(mapStateToProps, {
	updatePhotoMongo,
	getPhotoById,
	deletePhotoFromFirebase,
	deletePhotoFromMongo,
})(withRouter(UpdatePhoto));
