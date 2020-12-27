import imageCompression from 'browser-image-compression';
import { firebase } from '../../firebase/index';
import { setAlert } from '../alert';
import {
    FIREBASE_PHOTO_UPLOADED,
    FIREBASE_PHOTO_UPLOADING_ERROR,
    FIREBASE_PHOTO_UPLOADING,
} from '../../actions/types';

// Upload photo to Firebase
export const uploadPhotoFirebase = (file, imageName, userId, history) => async (
    dispatch
) => {
    try {
        dispatch({
            type: FIREBASE_PHOTO_UPLOADING,
        });

        const options = {
            maxSizeMB: 1,
            maxWidthOrHeight: 1920,
            useWebWorker: true
        };

        try {
            const compressedFile = await imageCompression(file, options);
            console.log('compressedFile instanceof Blob', compressedFile instanceof Blob); // true
            console.log(`compressedFile size ${compressedFile.size / 1024 / 1024} MB`); // smaller than maxSizeMB

            const storageRef = firebase
                .storage()
                .ref('photos/' + userId + '/' + imageName);
            await storageRef.put(compressedFile);

            const photo = {
                url: `https://firebasestorage.googleapis.com/v0/b/photomap-9caa6.appspot.com/o/photos%2F${userId}%2F${imageName}?alt=media`,
                imageName: imageName,
            };

            dispatch({
                type: FIREBASE_PHOTO_UPLOADED,
                payload: photo,
            });

            dispatch(setAlert('Photo Uploaded to Firebase!'));
        } catch (error) {
            console.log(error);
        }

        history.push('./uploadDetails');
    } catch (error) {
        dispatch({
            type: FIREBASE_PHOTO_UPLOADING_ERROR,
            payload: error,
        });
    }
};
