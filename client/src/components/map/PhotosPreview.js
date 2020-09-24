import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from '../layout/Spinner';

const PhotosPreview = ({ mapState: { photosOverview, loading } }) => {
	return loading ? (
		<Spinner />
	) : (
		<div className="photos-preview">
			{photosOverview.map((photo) => (
				<Link to={`/photo/${photo._id}`} photo={photo.title}>
					<img src={photo.url} alt="photo"/>
				</Link>
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
