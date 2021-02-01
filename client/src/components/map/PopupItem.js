import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import Modal from 'react-modal';
import PhotoModal from '../../modals/PhotoModal';
import './styles.css';

export class PopupItem extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Fragment>
                Test
                {/*
                <img onClick={this.open} src={this.props.url} alt="photo"/>
                <Modal
                    isOpen={this.state.showModal}
                    contentLabel="Minimal Modal Example"
                    className="photo-modal d-block"
                >
                    <PhotoModal photoId={this.props.photoId} close={this.close}></PhotoModal>
                </Modal>
                */}
            </Fragment>
        );
    }
}

export default PopupItem
