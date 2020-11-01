import React, { Fragment } from 'react';
import Modal from 'react-modal';
import PhotoModal from '../../modals/PhotoModal';
import './styles.css';

export class ProfilePhotoItem extends React.Component {
    constructor(props) {
        super(props);
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
        const { photo } = this.props;
        return (
            <Fragment>
                <img onClick={this.open} src={this.props.photo.url} alt="photo"/>
                <Modal
                    isOpen={this.state.showModal}
                    contentLabel="Minimal Modal Example"
                    className="modal d-block"
                >
                    <PhotoModal photoId={this.props.photo._id} close={this.close}></PhotoModal>
                </Modal>
            </Fragment>
        )
    }
}

export default ProfilePhotoItem
