import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import Modal from 'react-modal';
import PhotoModal from '../../modals/PhotoModal';

export class PhotosPreviewItem extends React.Component {
    constructor() {
        super();
        this.state = {
            showModal: false
        };

        this.open = this.open.bind(this);
        this.close = this.close.bind(this);
    }

    open() {
        this.setState({ showModal: true });
    }

    close() {
        this.setState({ showModal: false });
    }

    render() {
        return (
            <Fragment>
                <div onClick={this.open} className="text-center" id="feedPhotoItem">
                    <img src={this.props.photo.url} alt="photo"/>
                </div>
                <Modal
                    isOpen={this.state.showModal}
                    contentLabel="Minimal Modal Example"
                >
                    <PhotoModal photoId={this.props.photo._id} close={this.close}></PhotoModal>
                </Modal>
            </Fragment>
        );
    }
}

export default PhotosPreviewItem
