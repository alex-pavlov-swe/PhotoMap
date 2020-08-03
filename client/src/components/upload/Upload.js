import React, { useEffect, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { uploadPhotoFirebase } from '../../actions/photo';
import Spinner from '../layout/Spinner';
import Footer from '../layout/Footer';

const Upload = ({
  photo: { photo, loading },
  uploadPhotoFirebase,
  history,
}) => {
  const uploadPhotoHandle = (e) => {
    document.getElementById('uploadPhotoInput').click();
  };

  const uploadPhoto = async (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    const imageName = Math.round(Math.random() * 1000000000).toString();
    await uploadPhotoFirebase(file, imageName, history);
  };

  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <div className="container-fluid" id="upload-container">
        <div className="row mt-4 mb-4">
          <div className="col col-md-12 text-center">
            <h1>Upload</h1>
          </div>
        </div>
        <div className="row">
          <div className="col col-md-12 text-center mt-4 mb-2">
            <i className="fa fa-arrow-up fa-3x"></i>
          </div>
        </div>
        <div className="row mt-4 mb-4">
          <div className="col col-md-12 text-center">
            <button
              className="btn btn-primary"
              type="button"
              onClick={(e) => uploadPhotoHandle(e)}
            >
              Select a photo
            </button>
            <input
              type="file"
              id="uploadPhotoInput"
              onChange={(e) => uploadPhoto(e)}
              hidden
            />
          </div>
        </div>
      </div>
      <Footer />
    </Fragment>
  );
};

Upload.propTypes = {
  uploadPhotoFirebase: PropTypes.func.isRequired,
  photo: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  photo: state.photoUpload,
});

export default connect(mapStateToProps, { uploadPhotoFirebase })(
  withRouter(Upload)
);
