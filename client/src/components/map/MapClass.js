import React, { useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import { updatePhotoMongo } from '../../actions/photoUpload/photoUpdateMongo';
import { fetchPhotosOverview } from '../../actions/map/fetchPhotosOverview';
import { mapboxConfig } from '../../firebase/config';
import PhotosPreview from './PhotosPreview';
import currentPhoto from '../../reducers/currentPhoto';
import { currentPhotoClose } from '../../actions/currentPhoto';
import { getPhotoById } from '../../actions/currentPhoto';

const mapStateToProps = (state) => ({
    mapState: state.mapState,
    currentPhoto: state.currentPhoto,
});

const mapDispatchToProps = (dispatch) => ({
    fetchPhotosOverview: (bounds) => dispatch(fetchPhotosOverview(bounds)),
    updatePhotoMongo: () => dispatch(updatePhotoMongo()),
    currentPhotoClose: () => dispatch(currentPhotoClose()),
    getPhotoById: () => dispatch(getPhotoById())
});

export class Map extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPosition: [-122.7, 49.2],
            currentZoom: 9,
            markers: [],
            map: null
        }
    }

    componentDidMount() {
        this.initMap();
    }

    showMarker(lngLat) {
        const { map } = this.state;
        var markerHeight = 50,
            markerRadius = 10,
            linearOffset = 25;

        var popupOffsets = {
            top: [0, 0],
            'top-left': [0, 0],
            'top-right': [0, 0],
            bottom: [0, -markerHeight],
            'bottom-left': [
                linearOffset,
                (markerHeight - markerRadius + linearOffset) * -1,
            ],
            'bottom-right': [
                -linearOffset,
                (markerHeight - markerRadius + linearOffset) * -1,
            ],
            left: [markerRadius, (markerHeight - markerRadius) * -1],
            right: [-markerRadius, (markerHeight - markerRadius) * -1],
        };

        var popup = new mapboxgl.Popup({
            offset: popupOffsets,
            className: 'my-class',
            closeButton: false,
        })
            .setMaxWidth('300px')
            .addTo(map);

        var newMarker = new mapboxgl.Marker({ draggable: true })
            .setLngLat(lngLat)
            .addTo(map)
            .setPopup(popup);

        this.setState(state => {
            const list = state.list.concat(newMarker);
            return { list };
        });
    };

    initMap() {
        const { map, currentPosition, currentZoom } = this.state;
        mapboxgl.accessToken = mapboxConfig.accessToken;

        var newMap = new mapboxgl.Map({
            container: document.getElementById('mapContainer'),
            style: 'mapbox://styles/mapbox/satellite-streets-v11', // stylesheet location
            center: currentPosition, // starting position [lng, lat]
            zoom: currentZoom, // starting zoom
        });

        newMap.addControl(
            new MapboxGeocoder({
                accessToken: mapboxgl.accessToken,
                mapboxgl: mapboxgl,
                zoom: 10,
            })
        );

        var nav = new mapboxgl.NavigationControl();
        newMap.addControl(nav, 'top-left');

        newMap.on('moveend', function () {
            console.log("move end");
            // this.setState({
            //     currentZoom: newMap.getZoom(),
            //     currentPosition: newMap.getCenter()
            // });
            // this.fetchPhotos();
        });

        this.setState({
            map: newMap
        });
        //this.fetchPhotos();
    };

    fetchPhotos(center, zoom) {
        const { map } = this.state;
        const { photosOverview } = this.props;

        this.props.fetchPhotosOverview(map.getBounds());
        /*
        this.photosOverview.forEach((photo) => {
            this.showMarker(photo.lngLat);
        });
        */
    };

    render() {
        return (
            <Fragment>
                <div id="mapContainer" className="mapContainer" />
                <PhotosPreview />
            </Fragment>
        );
    }
};

Map.propTypes = {
    mapState: PropTypes.object.isRequired,
    currentPhoto: PropTypes.object,
    updatePhotoMongo: PropTypes.func.isRequired,
    fetchPhotosOverview: PropTypes.func.isRequired,
    currentPhotoClose: PropTypes.func.isRequired,
    getPhotoById: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Map);
