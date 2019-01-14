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
      waypoint: '',
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
    //   pathsRef.set({
    //     John: {
    //        number: 1,
    //        age: 30222
    //     },

    //     Amanda: {
    //        number: 2,
    //        age: 20
    //     }
    //  });

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
        this.placeMarker(e.latLng, this.map);
      });
    }
  }

  placeMarker(position, map) {
    new this.props.google.maps.Marker({
      position,
      map,
    });
    map.panTo(position);
    this.countDistance(position);
  }

  countDistance(position) {
    //let { pathsPriority, fromPoint, toPoint, waypoint } = this.state;
    const { maps } = this.props.google;
    //console.log('1', this.state.pathsPriority, this.state.fromPoint, this.state.toPoint);
    this.setState({
      pathsPriority: this.state.pathsPriority + 1,
    });

    const directionsService = new maps.DirectionsService();
    const directionsDisplay = new maps.DirectionsRenderer();
    directionsDisplay.setMap(this.map);

    if (this.state.pathsPriority === 1) {
      this.setState({
        fromPoint: position,
      });
    } else if (this.state.pathsPriority === 2) {
      this.setState({
        toPoint: position,
      });
    } else if (this.state.pathsPriority > 2) {
      this.setState({
        waypoint: this.state.toPoint,
        toPoint: position,
      });
    }

    console.log(
      '1',
      this.state.pathsPriority,
      this.state.fromPoint,
      this.state.toPoint,
      this.state.waypoint
    );
    (() => {
      let request = {
        origin: this.state.fromPoint,
        destination: this.state.toPoint,
        waypoints: [
          {
            location: this.state.waypoint,
          },
          // {
          //   location: new maps.LatLng(52.368, 5.9036),
          // },
        ],
        travelMode: 'WALKING',
      };
      directionsService.route(request, (result, status) => {
        if (status === 'OK') {
          directionsDisplay.setDirections(result);
          console.log(result.routes[0].legs[0].distance.text);
          console.log(result.routes[0].legs[0].duration.text);
          //console.log(result.routes[0].legs[1].distance.text);
          //console.log(result.routes[0].legs[2].distance.text);
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
