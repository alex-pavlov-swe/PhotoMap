import React, { Fragment } from 'react'
import Modal from 'react-modal';
import PhotoModal from '../../modals/PhotoModal';

export class FeedPhotoItem extends React.Component {
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
                <div className="text-center" id="feedPhotoItem">
                    <div onClick={this.open}>
                        <img src={this.props.photo.url} alt="photo"/>
                        <h1>{this.props.photo.title}</h1>
                        <p>{this.props.photo.description}</p>
                        <p>by {this.props.photo.name}</p>
                    </div>
                </div>
                <Modal
                    isOpen={this.state.showModal}
<<<<<<< HEAD
=======
                    className="photo-modal d-block"
>>>>>>> 2d23d22e7e3371dbe828a80e6ba2e01bdb80f6e4
                >
                    <PhotoModal photoId={this.props.photo._id} close={this.close}></PhotoModal>
                </Modal>
            </Fragment>
        );
    }
}

export default FeedPhotoItem
