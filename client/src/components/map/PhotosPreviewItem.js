import React, { Fragment } from 'react'

export class PhotosPreviewItem extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Fragment>
                <img onClick={this.props.onClick} src={this.props.photo.url} alt="photo" />
            </Fragment>
        );
    }
}

export default PhotosPreviewItem;
