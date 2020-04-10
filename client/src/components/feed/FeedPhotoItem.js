import React from 'react';

const FeedPhotoItem = ({ photo: photo }) => {
  return (
    <div className="card" id="feedPhotoItem">
      <div className="card-header">Photo</div>
      <div className="card-body">
        <img src={photo.url} alt="photo" />
        <h1>{photo.title}</h1>
        <p>{photo.description}</p>
      </div>
    </div>
  );
};

export default FeedPhotoItem;
