import React from 'react'

const ProfilePhotoItem = ({ url, title}) => {
    return (
        <div>
            <img src={url} width="200"/>
        </div>
    )
}

export default ProfilePhotoItem
