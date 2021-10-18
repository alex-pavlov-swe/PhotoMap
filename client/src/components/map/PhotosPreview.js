import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from '../layout/Spinner';
import PhotosPreviewItem from './PhotosPreviewItem';
import PhotoModal from '../../modals/PhotoModal';
import EventEmitter from '../../utils/events';
import { getPhotoById } from '../../actions/currentPhoto';

const PHOTOS_PER_PAGE = 5;

export class PhotosPreview extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPage: 1
        };
    }

    componentDidMount() {
        const { photosOverview } = this.props;

        EventEmitter.addEventListener("PHOTO_MARKER_CLICKED", () => { this.photoModal.openModal(); });
    }

    openModal(photo) {
        this.props.getPhotoById(photo._id);
        this.photoModal.openModal(this.props?.onPhotoModalClose);
    }

    firstPhotoToShow() {
        const { currentPage } = this.state;
        return (currentPage - 1) * PHOTOS_PER_PAGE;
    }

    pageRight() {
        this.setState({
            currentPage: this.state.currentPage + 1
        });
    }

    pageLeft() {
        this.setState({
            currentPage: this.state.currentPage - 1
        });
    }

    render() {
        const { photosOverview, loading } = this.props;
        const { currentPage } = this.state;
        const pages = Math.ceil(photosOverview?.length / PHOTOS_PER_PAGE)

        if (loading) {
            return (<Spinner />)
        } else if (this.props.mapState.photosOverview && this.props.mapState.photosOverview.length > 0) {
            return (
                <React.Fragment>
                    <div className="photos-preview" onClick={this.open}>
                        {photosOverview.slice(this.firstPhotoToShow(), this.firstPhotoToShow() + PHOTOS_PER_PAGE).map((photo) => (
                            <PhotosPreviewItem
                                key={photo._id}
                                photo={photo}
                                onClick={() => this.openModal(photo)}
                            />
                        ))}
                        {pages > 1 ? (
                            <div className="change-page-wrapper">
                                <i
                                    className={`fas fa-2x fa-backward ${currentPage > 1 ? 'active' : ''}`}
                                    onClick={() => currentPage > 1 ? this.pageLeft(): null}
                                ></i>
                                Page {currentPage} of {pages}
                                <i
                                    className={`fas fa-2x fa-forward ${currentPage < pages ? 'active' : ''}`}
                                    onClick={() => currentPage < pages ? this.pageRight(): null}
                                ></i>
                            </div>
                        ) : null}
                    </div>
                    <PhotoModal onRef={ref => (this.photoModal = ref)}></PhotoModal>
                </React.Fragment>
            )
        } else {
            return (
                null
            )
        }
    }
}

PhotosPreview.propTypes = {
    mapState: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    mapState: state.mapState,
    photosOverview: state.mapState.photosOverview
});

const mapDispatchToProps = (dispatch) => ({
    getPhotoById: (id) => dispatch(getPhotoById(id)),
})

export default connect(mapStateToProps, mapDispatchToProps)(PhotosPreview);
