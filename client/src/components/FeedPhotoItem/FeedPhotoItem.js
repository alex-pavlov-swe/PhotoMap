import React, { Fragment } from 'react'
import Modal from 'react-modal';
import PhotoModal from '../../modals/PhotoModal';

export class FeedPhotoItem extends React.Component {
    constructor(props) {
        super(props);
    }

    open() {
        this.photoModal.openModal();
    }

    render() {
        return (
            <Fragment>
                <div className="text-center" id="feedPhotoItem">
                    <div onClick={() => this.open()}>
                        <img src={this.props.photo.url} alt="photo" />
                        <h1>{this.props.photo.title}</h1>
                        <p>{this.props.photo.description}</p>
                        <p>by {this.props.photo.name}</p>
                    </div>
                </div>
                <PhotoModal onRef={ref => (this.photoModal = ref)} photoId={this.props.photo._id}></PhotoModal>
            </Fragment>
        );
    }
}

export default FeedPhotoItem;
