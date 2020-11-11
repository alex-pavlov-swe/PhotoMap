import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import Modal from 'react-modal';
import PhotoModal from '../../modals/PhotoModal';
import './styles.css';

export class PopupItem extends React.Component {
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
        let itemsToHide = document.getElementsByClassName('mapboxgl-ctrl');
        for (let i = 0; i < itemsToHide.length; i++) {
            itemsToHide[i].style.display = 'none';
        }
    }

    close() {
        this.setState({ showModal: false });
        let itemsToHide = document.getElementsByClassName('mapboxgl-ctrl');
        for (let i = 0; i < itemsToHide.length; i++) {
            itemsToHide[i].style.display = 'block';
        }
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
