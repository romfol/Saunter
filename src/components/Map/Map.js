import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { GoogleApiWrapper } from 'google-maps-react';
//import { pathsRef } from '../../config/firebase';

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
      pathsPriority: 0,
      fromPoint: '',
      toPoint: '',
      waypoints: [],
      firstMarker: undefined,
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

  loadMap() {
    if (this.props.google) {
      const { maps } = this.props.google;
      const { zoom } = this.state;
      const { lat, lng } = this.state.currentLocation;
      const center = new maps.LatLng(lat, lng);

      const node = ReactDOM.findDOMNode(this.refs.map);
      const mapConfig = {
        center,
        zoom,
      };
      this.map = new maps.Map(node, mapConfig);

      this.map.addListener('click', e => {
        this.showRoute(e.latLng, this.map);
      });
    }
  }

  showRoute(position, map) {
    const { maps } = this.props.google;
    this.setState({
      pathsPriority: this.state.pathsPriority + 1,
    });

    const directionsService = new maps.DirectionsService();
    const directionsDisplay = new maps.DirectionsRenderer();
    directionsDisplay.setMap(this.map);

    if (this.state.pathsPriority === 1) {
      let marker = new maps.Marker({
        position,
        map,
      });
      map.panTo(position);
      this.setState({
        fromPoint: position,
        firstMarker: marker,
      });
    } else if (this.state.pathsPriority === 2) {
      this.setState({
        toPoint: position,
        firstMarker: this.state.firstMarker.setMap(null),
      });
    } else if (this.state.pathsPriority > 2) {
      this.setState({
        waypoints: this.state.waypoints.concat({ location: this.state.toPoint }),
        toPoint: position,
      });
    }

    (() => {
      let request = {
        origin: this.state.fromPoint,
        destination: this.state.toPoint,
        waypoints: this.state.waypoints,
        travelMode: 'WALKING',
      };
      directionsService.route(request, (result, status) => {
        if (status === 'OK') {
          directionsDisplay.setDirections(result);
          (function countTotalDistance() {
            let totalDistance = 0;
            let legs = result.routes[0].legs;
            for (let i = 0; i < legs.length; ++i) {
              totalDistance += legs[i].distance.value;
            }
            console.log(totalDistance);
          })();
        }
      });
    })();
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
  zoom: 16,
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
