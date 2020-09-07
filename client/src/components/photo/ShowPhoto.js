import React, { useEffect, Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getPhotoById } from '../../actions/photo/currentPhotoGET';
import { deletePhotoFromFirebase } from '../../actions/photoUpload/photoDeleteFirebase';
import { deletePhotoFromMongo } from '../../actions/photoUpload/photoDeleteMongo';
import Spinner from '../layout/Spinner';

const ShowPhoto = ({
	currentPhoto: { photo, loading },
	getPhotoById,
	match,
	deletePhotoFromFirebase,
	deletePhotoFromMongo,
	history,
}) => {
	useEffect(() => {
		getPhotoById(match.params.id);
	}, [getPhotoById]);

	const onDeletePhoto = (e) => {
		deletePhotoFromFirebase(photo.imageName);
		deletePhotoFromMongo(match.params.id, history);
	};

	return (
		<Fragment>
			{loading ? (
				<Spinner />
			) : (
				<div className="container-fluid" id="currentPhoto">
					<div className="row bg-dark">
						<div className="col-md-10 offset-md-1 text-left ml-3 mt-1">
							<Link to="/feed">
								<div id="asd">
									<i className="fas fa-times fa-2x"></i>
								</div>
							</Link>
						</div>
					</div>
					<div className="row bg-dark" id="currentPhotoImg">
						<div className="col-md-10 offset-md-1 text-center">
							<img src={photo.url} />
						</div>
					</div>
					<div className="row bg-light">
						<div className="col-md-10 offset-1 text-left">
							<span>
								<Link to={`/photo/update/${photo._id}`}>
									<i className="fas fa-pencil-alt edit-icon"></i>
								</Link>
							</span>
							<span
								id="deletePhoto edit-icon"
								onClick={(e) => onDeletePhoto(e)}
							>
								<i className="far fa-trash-alt"></i>
							</span>
						</div>
					</div>
					<div className="row mt-3 border border-primary">
						<div className="col-md-12 text-center border border-warning">
							<h1>{photo.title}</h1>
							<p>
								<span>
									<img src={photo.avatar} className="avatar-show-photo" />
								</span>
								<span>by {photo.name}</span>
							</p>
							<p>{photo.description}</p>
							<div className="mapLink text-center align-middle">
								<Link to="/mapAddPhoto">Add this photo to the map</Link>
							</div>
							<br />
							<br />
							<br />
							<br />
							<br />
							<br />
							<br />
							<br />
							<br />
							<br />
							<br />
							<br />
						</div>
					</div>
				</div>
			)}
		</Fragment>
	);
};

ShowPhoto.propTypes = {
	getPhotoById: PropTypes.func.isRequired,
	deletePhotoFromFirebase: PropTypes.func.isRequired,
	deletePhotoFromMongo: PropTypes.func.isRequired,
	currentPhoto: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	currentPhoto: state.currentPhoto,
});

export default connect(mapStateToProps, {
	getPhotoById,
	deletePhotoFromFirebase,
	deletePhotoFromMongo,
})(withRouter(ShowPhoto));
