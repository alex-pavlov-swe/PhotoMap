import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from '../layout/Spinner';
import PhotosPreviewItem from './PhotosPreviewItem';

export class PhotosPreview extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { photosOverview, loading } = this.props;
        if (loading) {
            return (<Spinner />)
        } else if (this.props.mapState.photosOverview && this.props.mapState.photosOverview.length > 0) {
            return (
                <div className="photos-preview" onClick={this.open}>
                    {photosOverview.map((photo) => (
                        <PhotosPreviewItem photo={photo} key={photo._id} />
                    ))}
                </div>
            )
        } else {
            return (
                null
            )
        }
    }
}

PhotosPreview.propTypes = {
    mapState: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    mapState: state.mapState,
    photosOverview: state.mapState.photosOverview
});

export default connect(mapStateToProps)(PhotosPreview);
