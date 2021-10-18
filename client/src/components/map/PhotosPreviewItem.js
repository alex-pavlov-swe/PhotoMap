import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import EventEmitter from '../../utils/events';
import PropTypes from 'prop-types';
import PhotoModal from '../../modals/PhotoModal';

import { getPhotoById } from '../../actions/currentPhoto';

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
    getPhotoById: (id) => dispatch(getPhotoById(id)),
});

export class PhotosPreviewItem extends React.Component {
    constructor(props) {
        super(props);
    }

    previewClicked() {
        this.props.getPhotoById(this.props.photo._id)
            .then(() => {
                this.photoModal.openModal();
            });
    }

    render() {
        return (
            <Fragment>
                <img onClick={() => this.previewClicked() } src={this.props.photo.url} alt="photo" />
                <PhotoModal onRef={ref => (this.photoModal = ref)}></PhotoModal>
            </Fragment>
        );
    }
}

PhotosPreviewItem.propTypes = {
    getPhotoById: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(PhotosPreviewItem);
