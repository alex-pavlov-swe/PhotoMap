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
            pages: 1,
        };
    }

    componentDidMount() {
        const { photosOverview } = this.props;

        EventEmitter.addEventListener("PHOTO_MARKER_CLICKED", () => { this.photoModal.openModal(); });

        this.setState({
            pages: Math.round(photosOverview?.length / PHOTOS_PER_PAGE),
        });
    }

    openModal(photo) {
        this.props.getPhotoById(photo._id);
        this.photoModal.openModal(this.props?.onPhotoModalClose);
    }

    render() {
        const { photosOverview, loading } = this.props;
        const { pages } = this.state;

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
                        {pages > 1 ? (
                            <div> Page 1 </div>
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
