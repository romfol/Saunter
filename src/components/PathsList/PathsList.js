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

  transferData(key, title, distance, description, from, to, waypoints) {
    this.props.transferSelectedData(key, title, distance, description, from, to, waypoints);
  }

  render() {
    const data = this.props.data;

    if (data === null) {
      return <span>No data</span>;
    }

    const dataList = Object.keys(data).map(key => {
      let path = data[key];
      return (
        <li
          onClick={() =>
            this.transferData(
              key,
              path.title,
              path.totalDistance,
              path.fullDescription,
              path.fromPoint,
              path.toPoint,
              path.waypoints
            )
          }
          key={key}
        >
          <Alert color="success" style={{ padding: '10px 0 5px 0' }}>
            <Container>
              <Row>
                <Col xs="2">
                  <FontAwesomeIcon icon="map-marked-alt" size="2x" style={{ color: 'grey' }} />
                </Col>
                <Col xs="3" className="title">
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

const mapStateToProps = state => ({ data: state.data });

export default connect(
  mapStateToProps,
  { fetchPaths, transferSelectedData }
)(PathsList);
