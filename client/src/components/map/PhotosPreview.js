import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from '../layout/Spinner';
import PhotosPreviewItem from './PhotosPreviewItem';
import PhotoModal from '../../modals/PhotoModal';
import EventEmitter from '../../utils/events';
import { getPhotoById } from '../../actions/photo/currentPhotoGET';

export class PhotosPreview extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        EventEmitter.addEventListener("PHOTO_MARKER_CLICKED", () => { this.photoModal.openModal(); });
    }

    openModal(photo) {
        this.props.getPhotoById(photo._id);
        this.photoModal.openModal();
    }

    render() {
        const { photosOverview, loading } = this.props;
        if (loading) {
            return (<Spinner />)
        } else if (this.props.mapState.photosOverview && this.props.mapState.photosOverview.length > 0) {
            return (
                <React.Fragment>
                    <div className="photos-preview" onClick={this.open}>
                        {photosOverview.map((photo) => (
                            <PhotosPreviewItem
                                key={photo._id}
                                photo={photo}
                                onClick={() => this.openModal(photo)}
                            />
                        ))}
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
