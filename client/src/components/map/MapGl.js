import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ReactMapboxGl, { Layer, Feature, Marker, ScaleControl } from 'react-mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { mapboxConfig } from '../../firebase/config';
// import Geocoder from './Geocoder';
import PhotosPreview from './PhotosPreview';
import {
    getPhotoById,
    currentPhotoClose,
    showPhotoOnMapFinish,
} from '../../actions/currentPhoto';
import { fetchPhotosOverview } from '../../actions/map/fetchPhotosOverview';

const MapGl = ReactMapboxGl({
    accessToken: mapboxConfig.accessToken,
});

const mapStateToProps = (state) => ({
    mapState: state.mapState,
    currentPhoto: state.currentPhoto,
});

const mapDispatchToProps = (dispatch) => ({
    fetchPhotosOverview: (bounds) => dispatch(fetchPhotosOverview(bounds)),
    currentPhotoClose: () => dispatch(currentPhotoClose()),
    getPhotoById: () => dispatch(getPhotoById()),
    showPhotoOnMapFinish: () => dispatch(showPhotoOnMapFinish()),
});

export class Map extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPosition: [-122.7, 49.2],
            currentZoom: [9],
            markers: [],
            map: null,
        }
    }

    componentDidMount() { }

    initMap() { }

    showMarker() { }

    fetchPhotos(bounds) {
        const { photosOverview } = this.props;

        this.props.fetchPhotosOverview(bounds);
        /*
        this.photosOverview.forEach((photo) => {
            this.showMarker(photo.lngLat);
        });
        */
    };

    mapInitialRender(map) {
        //console.log("Initial Render");
        this.checkCloseUpView();
        this.fetchPhotos(map.getBounds());
    }

    mapRendered(map) {
        console.log("Map reRendered");
        this.fetchPhotos(map.getBounds());
    }

    checkCloseUpView() {
        console.log("checkCloseUpView");
        if (this.props.currentPhoto.showOnMap == true) {
            this.setState({ currentZoom: [12] });
            // setTimeout(() => this.props?.showPhotoOnMapFinish(), 2000);
        }
    }

    render() {
        const { currentZoom, currentPosition } = this.state;
        const { mapState } = this.props;

        return (
            <div className="mapWrapper">
                <MapGl
                    style="mapbox://styles/mapbox/satellite-streets-v11"
                    containerStyle={{
                        height: window.innerHeight - 80,
                        width: '100%',
                    }}
                    zoom={currentZoom}
                    center={currentPosition}
                    onStyleLoad={(map) => this.mapInitialRender(map)}
                    onZoomEnd={(map) => this.mapRendered(map)}
                    onMoveEnd={(map) => this.mapRendered(map)}
                >
                    <Layer type="symbol" id="marker" layout={{ 'icon-image': 'marker-15' }}>
                        <Feature coordinates={-122.7, 49.2} />
                    </Layer>
                    {/* <Geocoder /> */}
                </MapGl>
                {mapState.photosOverview?.length > 0 ? (
                    <PhotosPreview onPhotoModalClose={this.checkCloseUpView} />
                ) : null}
            </div>
        )
    }
}

Map.propTypes = {
    mapState: PropTypes.object.isRequired,
    currentPhoto: PropTypes.object,
    fetchPhotosOverview: PropTypes.func.isRequired,
    currentPhotoClose: PropTypes.func.isRequired,
    getPhotoById: PropTypes.func.isRequired,
    showPhotoOnMapFinish: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Map);
