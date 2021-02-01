import React, { useEffect, useState, Fragment, useRef } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import { updatePhotoMongo } from '../../actions/photoUpload/photoUpdateMongo';
import { fetchPhotosOverview } from '../../actions/map/fetchPhotosOverview';
import { currentPhotoClose } from '../../actions/photo/currentPhotoClose';
import { getPhotoById } from '../../actions/photo/currentPhotoGET';
import { mapboxConfig } from '../../firebase/config';
import PhotosPreview from './PhotosPreview';
import EventEmitter from '../../utils/events';

const Map = ({
    mapState: { photosOverview, loading },
    currentPhoto: { photo },
    updatePhotoMongo,
    fetchPhotosOverview,
    currentPhotoClose,
    getPhotoById,
}) => {
    const [position, setPosition] = useState([-122.7, 49.2]);
    const [zoom, setZoom] = useState(3);
    const [listener, setLstener] = useState(null);

    var map;
    var markers = [];

    useEffect(() => {
        initMap();

        setLstener(EventEmitter.addEventListener("PHOTO_ON_MAP_CLICKED", () => {
            console.log("!!!!!", photo);
            if (photo) {
                setPosition([photo.lngLat.lng, photo.lngLat.lat]);
                setZoom(12);
                setTimeout(() => {
                    currentPhotoClose();
                }, 1000);
            }
        }));

        return () => {
            // This executes on unmount
            EventEmitter.removeListener("PHOTO_ON_MAP_CLICKED", listener);
        }
    }, []);

    const showAllMarkers = function () {
        photosOverview.forEach((photo) => {
            showMarker(photo.lngLat);
        });
    }

    const showMarker = function (lngLat, url, photoId) {
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

        function htmlPopup() {
            var html = "";
            html += "<div class='text-center'>";
            html += "<img src=" + url;
            html += " id='" + photoId + "'";
            html += " width='100'/></div>";
            //html += "<p>" + feature.properties.description + "</p>";
            return html;
        }

        var popup = new mapboxgl.Popup({
            offset: popupOffsets,
            className: 'my-class',
            closeButton: false,
            closeOnMove: true
        })
            .setHTML(htmlPopup())
            .setMaxWidth('300px')
            .addTo(map);

        var newMarker = new mapboxgl.Marker({ draggable: false })
            .setLngLat(lngLat)
            .setPopup(popup);

        newMarker.getElement()?.addEventListener("click", () => {
            setTimeout(() => {
                popup.getElement()?.addEventListener("click", () => {
                    EventEmitter.emit("PHOTO_MARKER_CLICKED");
                    getPhotoById(photoId);
                });
            }, 300);
        });

        newMarker.addTo(map);

        markers.push(newMarker);
    };

    const initMap = function () {
        mapboxgl.accessToken = mapboxConfig.accessToken;

        map = new mapboxgl.Map({
            container: document.getElementById('mapViewContainer'),
            style: 'mapbox://styles/mapbox/satellite-streets-v11', // stylesheet location
            center: position, // starting position [lng, lat]
            zoom: zoom, // starting zoom
        });

        map.addControl(
            new MapboxGeocoder({
                accessToken: mapboxgl.accessToken,
                mapboxgl: mapboxgl,
                zoom: 10,
            })
        );

        var nav = new mapboxgl.NavigationControl();
        map.addControl(nav, 'top-left');

        map.on('moveend', function () {
            setZoom(map.getZoom());
            setPosition(map.getCenter());
            fetchPhotos();
        });

        fetchPhotos()
    };

    const fetchPhotos = (center, zoom) => {
        fetchPhotosOverview(map.getBounds())
            .then(function (res) {
                res?.data.forEach((photo) => {
                    showMarker(photo.lngLat, photo.url, photo._id);
                });
            });
    };

    return (
        <div className="mapWrapper">
            <div id="mapViewContainer" />
            {window.innerWidth > 600 ? (<PhotosPreview />) : null}
        </div>
    );
};

Map.propTypes = {
    mapState: PropTypes.object.isRequired,
    currentPhoto: PropTypes.object,
    updatePhotoMongo: PropTypes.func.isRequired,
    fetchPhotosOverview: PropTypes.func.isRequired,
    currentPhotoClose: PropTypes.func.isRequired,
    getPhotoById: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    mapState: state.mapState,
    currentPhoto: state.currentPhoto,
});

export default connect(mapStateToProps, {
    updatePhotoMongo,
    fetchPhotosOverview,
    currentPhotoClose,
    getPhotoById,
})(Map);