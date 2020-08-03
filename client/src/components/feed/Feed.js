import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getPhotos, loadingCompleted } from '../../actions/photo';
import Spinner from '../layout/Spinner';
import FeedPhotoItem from '../feed/FeedPhotoItem';
import InfiniteScroll from 'react-infinite-scroll-component';

const Feed = ({
  photoScroll: { photos, loading },
  getPhotos,
  loadingCompleted,
}) => {
  const [state, setState] = useState({
    items: [],
    next: 0,
  });

  useEffect(() => {
    getPhotos()
      .then(() => {
        loadingCompleted()
          .then(() => {
            fetchInitialData();
          })
      });
      
    setTimeout(() => {
      document.getElementById("btn1").click();
    }, 500);
  }, []);

  const fetchInitialData = () => {
    let initialPhotosCount = 3;
    let initialPhotos = [];

    if (photos) {

      if (photos.length < 3) {
        initialPhotosCount = photos.length;
      }

      for (let i = 0; i < initialPhotosCount; i++) {
        initialPhotos.push(
          <FeedPhotoItem
            photo={photos[i]}
            key={photos[i].imageName}
          />
        );
      }
      setState({
        items: state.items.concat(initialPhotos),
        next: initialPhotosCount,
      });
    }
  }

  const fetchMoreData = () => {
    if (state.next < photos.length) {
      setTimeout(() => {
        setState({
          items: state.items.concat(
            <FeedPhotoItem
              photo={photos[state.next]}
              key={photos[state.next].imageName}
            />
          ),
          next: state.next + 1,
        });
      }, 500);
    }
  };

  return loading ? (
    <Spinner />
  ) : (
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <h2 className="mt-3 mb-4">Home feed</h2>
          <button className="btn btn-primary" id="btn1" style={{visibility: "hidden"}} onClick={e => fetchInitialData()}>fetch</button>
        </div>
      </div>
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
  loadingCompleted: PropTypes.func.isRequired,
  photoScroll: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  photoScroll: state.photoScroll,
});

export default connect(mapStateToProps, { getPhotos, loadingCompleted })(Feed);
