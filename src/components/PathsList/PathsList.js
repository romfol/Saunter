import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPaths, transferSelectedData } from '../../actions';
import { Alert, Container, Row, Col, Input } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './styles.css';

class PathsList extends Component {
  componentDidMount() {
    this.props.fetchPaths();
  }

  transferData(id, title, distance, description, from, to, waypoints) {
    this.props.transferSelectedData(id, title, distance, description, from, to, waypoints);
  }

  render() {
    const data = this.props.data;
    //const favs = this.props.favourites.favourites;

    if (data === null) {
      return <span>No data</span>;
    }
    console.log(this.props.favourites.favourites[0]);

    const dataList = Object.keys(data).map(id => {
      let path = data[id];

      // let favClass = 'fave';
      // if (favs.includes(id)) {
      //   favClass += 'not-fave';
      // } else favClass = 'fave';

      return (
        <li
          onClick={() =>
            this.transferData(
              id,
              path.title,
              path.totalDistance,
              path.fullDescription,
              path.fromPoint,
              path.toPoint,
              path.waypoints
            )
          }
          key={id}
        >
          <Alert color="success" style={{ padding: '10px 0 5px ' }}>
            <Container>
              <Row>
                <Col xs="1">
                  <FontAwesomeIcon icon="star" size="1x" style={{ color: 'gold' }} />
                </Col>
                <Col xs="2">
                  <FontAwesomeIcon icon="map-marked-alt" size="2x" style={{ color: 'grey' }} />
                </Col>
                <Col xs="2" className="title">
                  {path.title.toUpperCase()}
                </Col>
                <Col xs="4" className="shortDesc">
                  {path.shortDescription}
                </Col>
                <Col xs="2" style={{ fontSize: '15px', padding: '0' }}>
                  {path.totalDistance} km
                </Col>
                <Col xs="1" style={{ padding: '5px' }}>
                  <FontAwesomeIcon icon="arrow-circle-right" size="2x" style={{ color: 'blue' }} />
                </Col>
              </Row>
            </Container>
          </Alert>
        </li>
      );
    });

    return (
      <>
        <Input type="text" name="title" placeholder="Search..." style={{ marginBottom: '15px' }} />
        <ul className="liContainer">{dataList}</ul>
      </>
    );
  }
}

const mapStateToProps = state => ({ data: state.data, favourites: state.favourites });

export default connect(
  mapStateToProps,
  { fetchPaths, transferSelectedData }
)(PathsList);
