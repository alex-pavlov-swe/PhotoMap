import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getPhotos } from '../../actions/photo';
import Spinner from '../layout/Spinner';
import FeedPhotoItem from '../feed/FeedPhotoItem';

const Feed = ({ photoScroll: { photos, loading }, getPhotos }) => {
  useEffect(() => {
    getPhotos();
  }, [getPhotos]);

  const items = [];

  if (photos) {
    for (let i = 0; i < photos.data.length; i++) {
      items.push(<FeedPhotoItem photo={photos.data[i]} />);
    }
  }

  return <div>{loading ? <Spinner /> : <div>{items}</div>}</div>;
};

Feed.propTypes = {
  getPhotos: PropTypes.func.isRequired,
  photo: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  photoScroll: state.photoScroll,
});

export default connect(mapStateToProps, { getPhotos })(Feed);
