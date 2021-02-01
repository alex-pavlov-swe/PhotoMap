import React, { Fragment } from 'react';
import PhotoModal from '../../modals/PhotoModal';
import EventEmitter from '../../utils/events';
import './styles.css';

export class ProfilePhotoItem extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { photo } = this.props;
        return (
            <Fragment>
                <img onClick={() => this.photoModal.openModal()} src={this.props.photo.url} alt="photo" />
                <PhotoModal onRef={ref => (this.photoModal = ref)} photoId={this.props.photo._id}></PhotoModal>
            </Fragment>
        )
    }
}

export default ProfilePhotoItem;
