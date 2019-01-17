import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { GoogleApiWrapper } from 'google-maps-react';

class ShowPath extends Component {
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.google !== this.props.google || this.props.from !== prevProps.from) {
      this.showPath();
    }
  }

  componentDidMount() {
    this.showPath();
  }

  showPath() {
    console.log(this.props);
    const { from, to, waypoints } = this.props;
    const { maps } = this.props.google;
    const node = ReactDOM.findDOMNode(this.refs.showPath);

    // convert string to LatLng
    var latlong = from.split(',');
    var latitude = parseFloat(latlong[0]);
    var longitude = parseFloat(latlong[1]);

    var mapConfig = {
      zoom: 15,
      center: { lat: latitude, lng: longitude },
    };
    this.map = new maps.Map(node, mapConfig);
    const directionsService = new maps.DirectionsService();
    const directionsDisplay = new maps.DirectionsRenderer();
    directionsDisplay.setMap(this.map);

    let request = {
      origin: from,
      destination: to,
      waypoints,
      travelMode: 'WALKING',
    };
    directionsService.route(request, (result, status) => {
      if (status === 'OK') {
        directionsDisplay.setDirections(result);
      }
    });
  }

  render() {
    return (
      <div ref="showPath" style={{ width: '540px', height: '480px' }}>
        Loading...
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyCVqpw6Ba0O5h3wLdeukvc7Lvuf_zIVYW4',
})(ShowPath);
