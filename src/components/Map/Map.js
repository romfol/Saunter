import React, { Component } from 'react';
import { Map, GoogleApiWrapper } from 'google-maps-react';

const mapStyles = {
  width: '100%',
  height: '100%',
};

export class MapContainer extends Component {
  render() {
    if (!this.props.loaded) {
      return <div>Loading...</div>;
    }

    return (
      <Map
        google={this.props.google}
        zoom={4}
        style={mapStyles}
        initialCenter={{
          lat: -1.2884,
          lng: 36.8233,
        }}
      />
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyCVqpw6Ba0O5h3wLdeukvc7Lvuf_zIVYW4',
})(MapContainer);
