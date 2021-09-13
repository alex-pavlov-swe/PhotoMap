import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import EventEmitter from '../../utils/events';
import PropTypes from 'prop-types';

import { getPhotoById } from '../../actions/currentPhoto';

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
    getPhotoById: (id) => getPhotoById(id),
});

export class PhotosPreviewItem extends React.Component {
    constructor(props) {
        super(props);
    }

    previewClicked() {
        EventEmitter.emit("PHOTOS_PREVIEW_ITEM_CLICKED");
        this.props.getPhotoById(this.props.photo.id);
    }

    render() {
        return (
            <Fragment>
                <img onClick={() => this.previewClicked() } src={this.props.photo.url} alt="photo" />
            </Fragment>
        );
    }
}

PhotosPreviewItem.propTypes = {
    getPhotoById: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(PhotosPreviewItem);
