import React, { Component } from 'react'
import mapboxgl from 'mapbox-gl';
import '../../css/map.css';

export class Map extends Component {
    componentDidMount() {
        mapboxgl.accessToken = 'pk.eyJ1IjoiYWxleHZhbiIsImEiOiJja2JyZ3V5amcwZXA4MnNvZTExeXliY3MxIn0.h4MnIZmh1ANGwnAunqJe2Q';

        var markers = [];

        var map = new mapboxgl.Map({
            container: this.mapContainer,
            style: 'mapbox://styles/mapbox/satellite-streets-v11', // stylesheet location
            center: [-74.5, 40], // starting position [lng, lat]
            zoom: 9 // starting zoom
        });

        map.on('click', function(e) {
            console.log('A click event has occurred at ' + e.lngLat + ', ' + e.lngLat);
            console.log(e);
            console.log(e.lngLat.lat, typeof(e.lngLat.lng));
          
            var prevMarker = markers.pop();
            if (prevMarker) {
                prevMarker.remove();
            }

            var markerHeight = 50, markerRadius = 10, linearOffset = 25;

            var popupOffsets = {
                'top': [0, 0],
                'top-left': [0,0],
                'top-right': [0,0],
                'bottom': [0, -markerHeight],
                'bottom-left': [linearOffset, (markerHeight - markerRadius + linearOffset) * -1],
                'bottom-right': [-linearOffset, (markerHeight - markerRadius + linearOffset) * -1],
                'left': [markerRadius, (markerHeight - markerRadius) * -1],
                'right': [-markerRadius, (markerHeight - markerRadius) * -1]
            };

            const saveLocationButton = "<div class='text-center'><button class='btn btn-warning' id='saveLocationButton'>Save Location</button><div>Drag the marker to change location</div></div>";

            var popup = new mapboxgl.Popup({offset: popupOffsets, className: 'my-class', closeButton: false})
                .setHTML(saveLocationButton)
                .setMaxWidth("300px")
                .addTo(map)
            
            var newMarker = new mapboxgl.Marker({draggable: true})
                .setLngLat(e.lngLat)
                .addTo(map)
                .setPopup(popup);

            markers.push(newMarker);

            document.getElementById('saveLocationButton').addEventListener("click", function() {
                console.log('test', e.lngLat);
            })
          });
          
          var nav = new mapboxgl.NavigationControl();
          map.addControl(nav, 'top-left');

          if (document.getElementById('saveLocationButton')) {
            document.getElementById('saveLocationButton').addEventListener("click", function() {
                console.log("Save Location!");
            });
          }
    }

    render() {
        return (
            <div>
                <div ref={el => this.mapContainer = el} className="mapContainer" />
            </div>
        )
    }
}

export default Map
