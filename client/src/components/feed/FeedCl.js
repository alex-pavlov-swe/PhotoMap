import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getPhotos } from '../../actions/photo';

const mapStateToProps = (state) => ({
    photoScroll: state.photoScroll
})

export class FeedCl extends Component {

    componentDidMount() {
        this.fetchPhotos();
    }

    fetchPhotos() {
        this.props.getPhotos();
    }

    render() {
        return (
            <div>
                Test
            </div>
        )
    }
}

export default connect(mapStateToProps, { getPhotos })(FeedCl);
