import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getPhotosNext } from '../../actions/photo/feedPhotosGET';

const mapStateToProps = (state) => ({
    photoScroll: state.photoScroll
})

export class FeedCl extends Component {

    componentDidMount() {
        this.fetchPhotos();
    }

    fetchPhotos() {
        this.props.getPhotosNext();
    }

    render() {
        return (
            <div>
                Test
            </div>
        )
    }
}

export default connect(mapStateToProps, { getPhotosNext })(FeedCl);
