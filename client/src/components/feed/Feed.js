import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getPhotos } from '../../actions/photo';
import Spinner from '../layout/Spinner';
import FeedPhotoItem from '../feed/FeedPhotoItem';
import InfiniteScroll from 'react-infinite-scroll-component';

const Feed = ({ photoScroll: { photos, loading }, getPhotos }) => {
  const [state, setState] = useState({
    items: [],
    next: 0,
  });

  useEffect(() => {
    getPhotos();

    if (photos) {
      setState({
        items: state.items.concat(
          <FeedPhotoItem photo={photos.data[0]} />,
          <FeedPhotoItem photo={photos.data[1]} />,
          <FeedPhotoItem photo={photos.data[2]} />
        ),
        next: 3,
      });
    }
  }, [getPhotos]);

  const fetchMoreData = () => {
    if (state.next < photos.data.length) {
      setTimeout(() => {
        console.log('!!!');
        setState({
          items: state.items.concat(
            <FeedPhotoItem photo={photos.data[state.next]} />
          ),
          next: state.next + 1,
        });
      }, 1500);
    }
  };

  return (
    <div>
      <InfiniteScroll
        dataLength={state.items.length}
        next={fetchMoreData}
        hasMore={true}
        loader={<h4>Loading...</h4>}
        endMessage={
          <p style={{ textAlign: 'center' }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        {state.items}
      </InfiniteScroll>
    </div>
  );
};

Feed.propTypes = {
  getPhotos: PropTypes.func.isRequired,
  photo: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  photoScroll: state.photoScroll,
});

export default connect(mapStateToProps, { getPhotos })(Feed);
