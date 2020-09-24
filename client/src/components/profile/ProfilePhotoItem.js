import React from 'react';
import { Link } from 'react-router-dom';

const ProfilePhotoItem = ({ photo: photo }) => {
    return (
        <Link to={`/photo/${photo._id}`} photo={photo.title}>
            <img src={photo.url} alt="photo"/>
        </Link>
    )
}

export default ProfilePhotoItem
