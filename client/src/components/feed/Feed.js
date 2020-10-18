import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getPhotos, loadingCompleted } from '../../actions/photo/feedPhotosGET';
import Spinner from '../layout/Spinner';
import FeedPhotoItem from '../FeedPhotoItem/FeedPhotoItem';
import InfiniteScroll from 'react-infinite-scroll-component';

const mapStateToProps = (state) => ({
    photoScroll: state.photoScroll
});

const mapDispatchToProps = (dispatch) => ({
    getPhotos: () => dispatch(getPhotos()),
    loadingCompleted: () => dispatch(loadingCompleted()),
});

export class Feed extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            next: 0
        }
    }

    componentDidMount() {
        this.props.getPhotos().then(() => {
			this.props.loadingCompleted().then(() => {
				this.fetchInitialData();
			});
		});
    }

	fetchInitialData() {
        console.log("hello", this.props);
        const { photos } = this.props.photoScroll;
        loadingCompleted();
		let initialPhotosCount = 3;
		let initialPhotos = [];

		if (photos) {
			if (photos.length < 3) {
				initialPhotosCount = photos.length;
			}

			for (let i = 0; i < initialPhotosCount; i++) {
				initialPhotos.push(
					<FeedPhotoItem photo={photos[i]} key={photos[i].imageName} />
				);
			}
			this.setState({
				items: this.state.items.concat(initialPhotos),
				next: initialPhotosCount,
			});
		}
	};

	fetchMoreData(props) {
        const { photos } = props;
		if (this.state.next < photos.length) {
			setTimeout(() => {
				this.setState({
					items: this.state.items.concat(
						<FeedPhotoItem
							photo={photos[this.state.next]}
							key={photos[this.state.next].imageName}
						/>
					),
					next: this.state.next + 1,
				});
			}, 500);
		}
	};

    render() {
        const { loading } = this.props.photoScroll;
        return (loading || !this.state.items.length) ? (
            <Spinner />
        ) : (
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <h2 className="mt-3 mb-4">Home feed</h2>
                    </div>
                </div>
                <InfiniteScroll
                    dataLength={this.state.items.length}
                    next={this.fetchMoreData(this.props.photoScroll)}
                    hasMore={true}
                    loader={<h4>Loading...</h4>}
                    endMessage={
                        <p style={{ textAlign: 'center' }}>
                            <b>Yay! You have seen it all</b>
                        </p>
                    }
                >
                    {this.state.items}
                </InfiniteScroll>
            </div>
        );
    }
};

Feed.propTypes = {
	getPhotos: PropTypes.func.isRequired,
	loadingCompleted: PropTypes.func.isRequired,
	photoScroll: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Feed);
