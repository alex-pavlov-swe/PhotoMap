import React, { useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getPhotoById } from '../actions/photo/currentPhotoGET';
import { currentPhotoProfileGET } from '../actions/photo/currentPhotoProfileGET';
import { currentPhotoClose } from '../actions/photo/currentPhotoClose';
import { deletePhotoFromFirebase } from '../actions/photoUpload/photoDeleteFirebase';
import { deletePhotoFromMongo } from '../actions/photoUpload/photoDeleteMongo';
import Spinner from '../components/layout/Spinner';
import { NO_AVATAR } from '../constants/links';

const mapStateToProps = (state) => ({
	currentPhoto: state.currentPhoto,
});

const mapDispatchToProps = (dispatch) => ({
    getPhotoById: (id) => dispatch(getPhotoById(id)),
    currentPhotoClose: () => dispatch(currentPhotoClose()),
	deletePhotoFromFirebase: (user, imageName) => dispatch(deletePhotoFromFirebase(user, imageName)),
    deletePhotoFromMongo: (id) => dispatch(deletePhotoFromMongo(id)),
    currentPhotoProfileGET: (id) => dispatch(currentPhotoProfileGET(id))
});

export class PhotoModal extends React.Component {
    constructor(props) {
        super(props);
        this.closeModal = this.closeModal.bind(this);
    }
	componentDidMount() {
        this.props.getPhotoById(this.props.photoId)
        .then(() => {
            this.props.currentPhotoProfileGET(this.props.currentPhoto && this.props.currentPhoto.photo ? this.props.currentPhoto.photo.user : null);
        });
    };

    componenWillUnmount() {
        this.props.currentPhotoClose();
    }

	onDeletePhoto (e) {
        const { photo } = this.props.currentPhoto;
        this.closeModal();
        this.props.deletePhotoFromFirebase(photo.user, photo.imageName)
            .then(() => {
                this.props.deletePhotoFromMongo(photo._id);
            });
    };

    closeModal() {
        this.props.close();
        this.props.currentPhotoClose();
    }

	render() {
        const { photo, profile, loading } = this.props.currentPhoto;
        return (
            <Fragment>
                <br></br>
                {loading ? (
                    <Spinner/>
                ) : (
                    <div className="photo-modal d-block full-screen-popup container-fluid" id="currentPhoto">
                        <div className="row bg-dark">
                            <div className="col-md-10 offset-md-1 text-left ml-3 mt-1">
                                    <div id="asd" onClick={this.closeModal}>
                                        <i className="fas fa-times fa-2x"></i>
                                    </div>
                            </div>
                        </div>
                        <div className="row bg-dark" id="currentPhotoImg">
                            <div className="col-md-10 offset-md-1 text-center">
                                <img src={photo.url} className="modal-img"/>
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
                                    onClick={(e) => this.onDeletePhoto(e)}
                                >
                                    <i className="far fa-trash-alt"></i>
                                </span>
                            </div>
                        </div>
                        <div className="row bg-light border border-primary">
                            <div className="col-md-12 text-center border border-warning">
                                <h1>{photo.title}</h1>
                                <p>
                                    <span>
                                        <Link to={`/profile/${profile ? profile.user._id : ''}`}>
                                            <img src={profile && profile.avatar ? profile.avatar : NO_AVATAR } className="avatar-show-photo" />
                                        </Link>
                                    </span>
                                    <span>
                                        <Link to={`/profile/${profile ? profile.user._id : ''}`}>
                                            {photo.name}
                                        </Link>
                                        </span>
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
    }
};

PhotoModal.propTypes = {
    getPhotoById: PropTypes.func.isRequired,
    currentPhotoProfileGET: PropTypes.func.isRequired,
    currentPhotoClose: PropTypes.func.isRequired,
	deletePhotoFromFirebase: PropTypes.func.isRequired,
    deletePhotoFromMongo: PropTypes.func.isRequired,
    getPhotoById: PropTypes.func.isRequired,
    currentPhoto: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(PhotoModal);
