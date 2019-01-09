import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { GoogleApiWrapper } from 'google-maps-react';

class Map extends Component {
  constructor(props) {
    super(props);
    const { lat, lng } = this.props.initialCenter;
    this.state = {
      zoom: this.props.zoom,
      currentLocation: {
        lat,
        lng,
      },
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.google !== this.props.google) {
      this.loadMap();
    }
    if (prevState.currentLocation !== this.state.currentLocation) {
      this.recenterMap();
    }
  }

  recenterMap() {
    const map = this.map;
    const curr = this.state.currentLocation;

    const google = this.props.google;
    const maps = google.maps;

    if (map) {
      let center = new maps.LatLng(curr.lat, curr.lng);
      map.panTo(center);
    }
  }

  componentDidMount() {
    if (this.props.centerAroundCurrentLocation) {
      if (navigator && navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(pos => {
          const coords = pos.coords;
          this.setState({
            currentLocation: {
              lat: coords.latitude,
              lng: coords.longitude,
            },
          });
        });
      }
    }
    this.loadMap();
  }

  loadMap() {
    if (this.props.google) {
      const { maps } = this.props.google;
      const node = ReactDOM.findDOMNode(this.refs.map);

      const { zoom } = this.state;
      const { lat, lng } = this.state.currentLocation;

      const center = new maps.LatLng(lat, lng);
      const mapConfig = {
        center,
        zoom,
      };
      this.map = new maps.Map(node, mapConfig);
      
      const map = this.map;
      map.addListener('click', function(e) {
        placeMarker(e.latLng, map);
      });

      function placeMarker(position, map) {
        new maps.Marker({
          position,
          map,
        });
        map.panTo(position);
      }
    }
  }

  render() {
    return (
      <div ref="map" style={styles}>
        Loading...
      </div>
    );
  }
}

Map.defaultProps = {
  zoom: 14,
  // Amst by default
  initialCenter: {
    lat: 52.368,
    lng: 4.9036,
  },
  centerAroundCurrentLocation: true,
};

Map.propTypes = {
  google: PropTypes.object,
  zoom: PropTypes.number,
  initialCenter: PropTypes.object,
  centerAroundCurrentLocation: PropTypes.bool,
};

const styles = {
  width: '100vw',
  height: '100vh',
};

export default GoogleApiWrapper({
  apiKey: 'AIzaSyCVqpw6Ba0O5h3wLdeukvc7Lvuf_zIVYW4',
})(Map);
