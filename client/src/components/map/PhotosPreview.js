import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from '../layout/Spinner';

const PhotosPreview = ({ mapState: { photosOverview, loading } }) => {
	return loading ? (
		<Spinner />
	) : (
		<div className="photos-preview">
			{photosOverview.map((photo) => (
				<img src={photo.url} alt="photo" />
			))}
		</div>
	);
};

Map.propTypes = {
	mapState: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	mapState: state.mapState,
});

export default connect(mapStateToProps)(PhotosPreview);
