import React, { Component } from 'react';
import { Map, GoogleApiWrapper } from 'google-maps-react';

const mapStyles = {
  width: '100%',
  height: '100%',
  marginTop: '72px',
};

export class MapContainer extends Component {
  render() {
    return (
      <div className="container-fluid" id="map-container">
        <Map
          google={this.props.google}
          zoom={8}
          style={mapStyles}
          initialCenter={{ lat: 47.444, lng: -122.176 }}
        />
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyCVBeQRbtorSxu023KYEIapNIMgT66U9eI',
})(MapContainer);
