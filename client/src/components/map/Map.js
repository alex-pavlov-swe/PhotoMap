import React, { useEffect, useState, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import { updatePhotoMongo } from '../../actions/photoUpload/photoUpdateMongo';
import { fetchPhotosOverview } from '../../actions/map/fetchPhotosOverview';
import { mapboxConfig } from '../../firebase/config';
import PhotosPreview from './PhotosPreview';
import Modal from 'react-modal';
import PhotoModal from '../../modals/PhotoModal';

const Map = ({
    mapState: { photosOverview, loading },
    updatePhotoMongo,
    fetchPhotosOverview,
    history,
}) => {
    //var currentPosition = [-122.7, 49.2];
    var currentPosition = [0, 0];
    var currentZoom = 2;

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


        function htmlMarker() {
            var html = "";
            html += "<div class='text-center'>";
            html += "<img src=" + url;
            html += " id='" + photoId + "' ";
            html += " style='background-image: url('https://firebasestorage.googleapis.com/v0/b/photomap-9caa6.appspot.com/o/photos%2F5fac80a1c8bdf22cf26ce876%2F609580504?alt=media');'";
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
            <PhotosPreview />
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
    updatePhotoMongo: PropTypes.func.isRequired,
    fetchPhotosOverview: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    mapState: state.mapState,
});

export default connect(mapStateToProps, {
    updatePhotoMongo,
    fetchPhotosOverview,
})(Map);