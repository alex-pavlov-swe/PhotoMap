import React, { useEffect, useState, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import { updatePhotoMongo } from '../../actions/photoUpload/photoUpdateMongo';
import { fetchPhotosOverview } from '../../actions/map/fetchPhotosOverview';
import { currentPhotoClose } from '../../actions/photo/currentPhotoClose';
import { mapboxConfig } from '../../firebase/config';
import PhotosPreview from './PhotosPreview';
import Modal from 'react-modal';
import PhotoModal from '../../modals/PhotoModal';

const Map = ({
    mapState: { photosOverview, loading },
    currentPhoto: { photo },
    updatePhotoMongo,
    fetchPhotosOverview,
    currentPhotoClose,
}) => {
    var currentPosition = [0, 0];
    var currentZoom = 3;

    if (!photo) {
        currentPosition = [-122.7, 49.2];
        currentZoom = 3;
    } else {
        currentPosition = [photo.lngLat.lng, photo.lngLat.lat];
        currentZoom = 12;
    }

    var map;
    var markers = [];

    useEffect(() => {
        initMap();
    }, []);

    const [showModal, setShowModal] = useState(false);
    const [photoId, setPhotoId] = useState(null);

    const openModal = (id) => {
        setPhotoId(id);
        setShowModal(true);
        let itemsToHide = document.getElementsByClassName('mapboxgl-ctrl');
        for (let i = 0; i < itemsToHide.length; i++) {
            itemsToHide[i].style.display = 'none';
        }
    }

    const closeModal = () => {
        if (photo) {
            initMap();
            currentPhotoClose();
        }
        setShowModal(false);
        let itemsToHide = document.getElementsByClassName('mapboxgl-ctrl');
        for (let i = 0; i < itemsToHide.length; i++) {
            itemsToHide[i].style.display = 'block';
        }
    }

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

        newMarker.getElement().addEventListener("click", () => {
            //newMarker.togglePopup();
            setTimeout(() => {
                if (popup.getElement()) {
                    popup.getElement().addEventListener("click", () => {
                        openModal(photoId);
                    })
                }
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
            center: currentPosition, // starting position [lng, lat]
            zoom: currentZoom, // starting zoom
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
            currentZoom = map.getZoom();
            currentPosition = map.getCenter();
            fetchPhotos();
        });

        fetchPhotos()
    };

    const fetchPhotos = (center, zoom) => {
        fetchPhotosOverview(map.getBounds())
            .then(function (res) {
                res.data.forEach((photo) => {
                    showMarker(photo.lngLat, photo.url, photo._id);
                });
            });
    };

    return (
        <div className="mapWrapper">
            <div id="mapViewContainer" />
            {window.innerWidth > 600 ? (<PhotosPreview />) : null}
            <Modal
                isOpen={showModal}
                className="photo-modal d-block"
            >
                <PhotoModal photoId={photoId} close={closeModal}></PhotoModal>
            </Modal>
        </div>
    );
};

Map.propTypes = {
    mapState: PropTypes.object.isRequired,
    currentPhoto: PropTypes.object,
    updatePhotoMongo: PropTypes.func.isRequired,
    fetchPhotosOverview: PropTypes.func.isRequired,
    currentPhotoClose: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    mapState: state.mapState,
    currentPhoto: state.currentPhoto,
});

export default connect(mapStateToProps, {
    updatePhotoMongo,
    fetchPhotosOverview,
    currentPhotoClose,
})(Map);