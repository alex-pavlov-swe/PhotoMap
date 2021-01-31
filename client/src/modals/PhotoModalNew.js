import React, { useEffect, Fragment } from 'react';
import Modal from 'react-modal';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getPhotoById } from '../actions/photo/currentPhotoGET';
import { currentPhotoProfileGET } from '../actions/photo/currentPhotoProfileGET';
import { currentPhotoClose } from '../actions/photo/currentPhotoClose';
import { deletePhotoFromFirebase } from '../actions/photoUpload/photoDeleteFirebase';
import { deletePhotoFromMongo } from '../actions/photoUpload/photoDeleteMongo';
import { updatePhotoMongo } from '../actions/photoUpload/photoUpdateMongo';
import Spinner from '../components/layout/Spinner';
import { NO_AVATAR } from '../constants/links';
import { UpdatePhotoModal } from './UpdatePhotoModal';
import { RED_LIKE } from '../constants/colors';

const mapStateToProps = (state) => ({
    currentPhoto: state.currentPhoto,
    auth: state.auth
});

const mapDispatchToProps = (dispatch) => ({
    getPhotoById: (id) => dispatch(getPhotoById(id)),
    currentPhotoClose: () => dispatch(currentPhotoClose()),
    deletePhotoFromFirebase: (user, imageName) => dispatch(deletePhotoFromFirebase(user, imageName)),
    deletePhotoFromMongo: (id) => dispatch(deletePhotoFromMongo(id)),
    updatePhotoMongo: (data) => dispatch(updatePhotoMongo(data)),
    currentPhotoProfileGET: (id) => dispatch(currentPhotoProfileGET(id))
});

export class PhotoModalNew extends React.Component {
    constructor(props) {
        super(props);
        this.closeModal = this.closeModal.bind(this);
        this.state = {
            showModal: false,
            showUpdateModal: false,
        };
        this.openUpdateModal = this.openUpdateModal.bind(this);
        this.closeUpdateModal = this.closeUpdateModal.bind(this);
    }

    componentDidMount() {
        this.props.onRef(this);
    };

    componenWillUnmount() {
        this.props.currentPhotoClose();
        this.props.onRef(undefined);
    }

    onDeletePhoto(e) {
        const { photo } = this.props.currentPhoto;

        if (window.confirm('Are you sure you want to delete this photo?')) {
            this.closeModal();
            this.props.deletePhotoFromFirebase(photo.user, photo.imageName)
                .then(() => {
                    this.props.deletePhotoFromMongo(photo._id);
                });
        }
    };

    openModal() {
        this.props.getPhotoById(this.props.photoId)
            .then(() => {
                this.props.currentPhotoProfileGET(this.props.currentPhoto && this.props.currentPhoto.photo ? this.props.currentPhoto.photo.user : null);
            });
        this.setState({ showModal: true });
        let itemsToHide = document.getElementsByClassName('mapboxgl-ctrl');
        for (let i = 0; i < itemsToHide.length; i++) {
            itemsToHide[i].style.display = 'none';
        }
    }

    closeModal() {
        this.setState({ showModal: false });
        this.props.currentPhotoClose();
        let itemsToHide = document.getElementsByClassName('mapboxgl-ctrl');
        for (let i = 0; i < itemsToHide.length; i++) {
            itemsToHide[i].style.display = 'block';
        }
    }

    focusOnPhoto() {
        this.props.close();
    }

    openUpdateModal() {
        this.setState({ showUpdateModal: true });
    }

    closeUpdateModal() {
        this.setState({ showUpdateModal: false });
    }

    like() {
        const data = {
            id: this.props.currentPhoto.photo._id,
            likeUserId: this.props.auth.user._id
        };

        this.props.updatePhotoMongo(data);
    }

    render() {
        const { showModal } = this.state;
        const { photo, profile, loading } = this.props.currentPhoto;
        const { user } = this.props.auth;
        return (
            <Modal
                isOpen={showModal}
                className="photo-modal d-block"
            >
                <br></br>
                {loading ? (
                    <Spinner />
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
                                    <img src={photo.url} className="modal-img" />
                                </div>
                            </div>
                            {user && user._id === photo.user ? (
                                <div className="row bg-light">
                                    <div className="col-md-10 offset-1 text-center iconsWrapper">
                                        <div className="likeIconWrapper">
                                            <span className="" onClick={() => this.like()}>
                                                <i className="fas fa-heart fa-2x likeIcon" style={{ color: this.props.currentPhoto.photo.likes.includes(this.props.auth.user._id) ? RED_LIKE : "grey" }}></i>
                                            </span>
                                        </div>
                                        <div className="editIconWrapper">
                                            <span>
                                                <Link to={`/photo/update/${photo._id}`}>
                                                    <i className="fas fa-pencil-alt editIcon"></i>
                                                </Link>
                                            </span>
                                            <span
                                                id="deletePhoto editIcon"
                                                onClick={(e) => this.onDeletePhoto(e)}
                                            >
                                                <i className="far fa-trash-alt"></i>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                    null
                                )}
                            <div className="row bg-light border border-primary">
                                <div className="col-md-12 text-center border border-warning">
                                    <h1>{photo.title}</h1>
                                    <p>
                                        <span>
                                            <Link to={`/profile/${profile ? profile.user._id : ''}`}>
                                                <img src={profile && profile.avatar ? profile.avatar : NO_AVATAR} className="avatar-show-photo" />
                                            </Link>
                                        </span>
                                        <span>
                                            <Link to={`/profile/${profile ? profile.user._id : ''}`} className="photoModalLink">
                                                {photo.name}
                                            </Link>
                                        </span>
                                    </p>
                                    <p>{photo.description}</p>
                                    {photo.tips ? (
                                        <p><strong>Photo Tips</strong> - {photo.tips}</p>
                                    ) : null}
                                    <div className="mapLink text-center align-middle">
                                        <Link to="/map" onClick={() => this.focusOnPhoto()}>This photo on the map</Link>
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
                    )
                }
            </Modal>
        );
    }
};

PhotoModalNew.propTypes = {
    getPhotoById: PropTypes.func.isRequired,
    currentPhotoProfileGET: PropTypes.func.isRequired,
    currentPhotoClose: PropTypes.func.isRequired,
    deletePhotoFromFirebase: PropTypes.func.isRequired,
    deletePhotoFromMongo: PropTypes.func.isRequired,
    updatePhotoMongo: PropTypes.func.isRequired,
    getPhotoById: PropTypes.func.isRequired,
    currentPhoto: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(PhotoModalNew);
