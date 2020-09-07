import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import '../../css/map.css';
import { updatePhotoMongo } from '../../actions/photoUpload/photoUpdateMongo';
import { mapboxConfig } from '../../firebase/config';

const Map = ({
	currentPhoto: { photo, loading },
	updatePhotoMongo,
	history,
}) => {
	var currentPosition = {
		lat: 0,
		lng: 0,
	};

	var markers = [];
	var map;

	const showSingleMarker = function (lngLat) {
		var prevMarker = markers.pop();
		if (prevMarker) {
			prevMarker.remove();
		}

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

		const saveLocationButton =
			"<div class='text-center'><button class='btn btn-warning' id='saveLocationButton'>Save Location</button><div>Drag the marker to change location</div></div>";

		var popup = new mapboxgl.Popup({
			offset: popupOffsets,
			className: 'my-class',
			closeButton: false,
		})
			.setHTML(saveLocationButton)
			.setMaxWidth('300px')
			.addTo(map);

		var newMarker = new mapboxgl.Marker({ draggable: true })
			.setLngLat(lngLat)
			.addTo(map)
			.setPopup(popup);

		markers.push(newMarker);

		document
			.getElementById('saveLocationButton')
			.addEventListener('click', function () {
				const formData = {};
				formData.lngLat = lngLat;
				formData.id = photo._id;
				updatePhotoMongo(formData, history);
			});
	};

	const initMap = function () {
		mapboxgl.accessToken = mapboxConfig.accessToken;

		map = new mapboxgl.Map({
			container: document.getElementById('mapContainer'),
			style: 'mapbox://styles/mapbox/satellite-streets-v11', // stylesheet location
			center: [-122.7, 49.2], // starting position [lng, lat]
			zoom: 9, // starting zoom
		});

		map.addControl(
			new MapboxGeocoder({
				accessToken: mapboxgl.accessToken,
				mapboxgl: mapboxgl,
				zoom: 10,
			})
		);

		if (photo && photo.lngLat) {
			showSingleMarker(photo.lngLat);
		}

		map.on('click', function (e) {
			showSingleMarker(e.lngLat);
		});

		var nav = new mapboxgl.NavigationControl();
		map.addControl(nav, 'top-left');
	};

	useEffect(() => {
		initMap();
	}, []);

	return (
		<div>
			<div id="mapContainer" className="mapContainer" />
		</div>
	);
};

Map.propTypes = {
	currentPhoto: PropTypes.object.isRequired,
	updatePhotoMongo: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	currentPhoto: state.currentPhoto,
});

export default connect(mapStateToProps, { updatePhotoMongo })(Map);
