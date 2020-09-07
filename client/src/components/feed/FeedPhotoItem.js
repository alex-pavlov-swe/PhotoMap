import React from 'react';
import { Link } from 'react-router-dom';

const FeedPhotoItem = ({ photo: photo }) => {
	return (
		<div className="text-center" id="feedPhotoItem">
			<div>
				<Link to={`/photo/${photo._id}`} photo={photo.title}>
					<img src={photo.url} alt="photo" />
				</Link>
				<h1>{photo.title}</h1>
				<p>{photo.description}</p>
				<p>by {photo.userName}</p>
			</div>
		</div>
	);
};

export default FeedPhotoItem;
