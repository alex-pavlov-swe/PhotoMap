import React, { Fragment } from 'react'
import Modal from 'react-modal';
import PhotoModalNew from '../../modals/PhotoModalNew';

export class FeedPhotoItemNew extends React.Component {
    constructor(props) {
        super(props);
    }

    open() {
        console.log(this.props);
        this.photoModalNew.openModal();
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
                <PhotoModalNew onRef={ref => (this.photoModalNew = ref)} photoId={this.props.photo._id}></PhotoModalNew>
            </Fragment>
        );
    }
}

export default FeedPhotoItemNew;
