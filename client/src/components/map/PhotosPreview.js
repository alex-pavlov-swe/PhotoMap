import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from '../layout/Spinner';
import PhotosPreviewItem from './PhotosPreviewItem';

export class PhotosPreview extends React.Component {
    render() {
        const { photosOverview, loading } = this.props;
        if (loading) {
            return (<Spinner />)
        } else {
            return (
                <div className="photos-preview" onClick={this.open}>
                    {photosOverview.map((photo) => (
                        <PhotosPreviewItem photo={photo} />
                    ))}
                </div>
            )
        }
    }
}

PhotosPreview.propTypes = {
    mapState: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    loading: state.mapState.loading,
    photosOverview: state.mapState.photosOverview
});

export default connect(mapStateToProps)(PhotosPreview);
