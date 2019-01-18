import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPaths, fetchFavs, transferSelectedData } from '../../actions';
import { Alert, Container, Row, Col, Input } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './styles.css';

class PathsList extends Component {
  state = {
    data: {},
    filtered: {},
  };

  componentDidMount() {
    this.props.fetchPaths();
    this.setState({ data: this.props.data });
    console.log(this.props.data);
    this.props.fetchFavs();
  }

  static getDerivedStateFromProps = props => ({
    data: props.data,
  });

  transferData(id, title, distance, description, from, to, waypoints) {
    this.props.transferSelectedData(id, title, distance, description, from, to, waypoints);
  }

  handleChande = e => {
    if (e.target.value !== '') {
      console.log(this.state);
      const currentData = this.state.data;
      const filteredData = Object.keys(currentData).map(id => {
        const path = currentData[id];
        Object.keys(path).filter(id => {
          if (id == 'title' || id == 'fullDescription') {
            const pathData = path[id];
            console.log(pathData);
          }
        });
      });
    }
  };

  render() {
    const data = this.state.data;
    const favs = this.props.favourites;
    console.log('data to list: ', data);
    if (data === null) {
      return <span>No data</span>;
    }

    const dataList = Object.keys(data).map(id => {
      const path = data[id];

      let favClass = 'fave';
      if (favs === null || !Object.keys(favs).includes(id)) {
        favClass = 'not-fave';
      } else favClass = 'fave';

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
                <Col xs="2">
                  <FontAwesomeIcon icon="map-marked-alt" size="2x" style={{ color: '3370cc' }} />
                </Col>

                <Col xs="7">
                  <div className="title">
                    <FontAwesomeIcon icon="star" size="2x" className={favClass} />
                    {path.title.toUpperCase()}
                  </div>
                  <div className="shortDesc">{path.shortDescription}</div>
                </Col>
                <Col xs="2" style={{ fontSize: '15px', padding: '0' }}>
                  {path.totalDistance} km
                </Col>
                <Col xs="1" style={{ padding: '5px' }}>
                  <FontAwesomeIcon
                    icon="arrow-circle-right"
                    size="2x"
                    style={{ color: '3370cc' }}
                  />
                </Col>
              </Row>
            </Container>
          </Alert>
        </li>
      );
    });

    return (
      <>
        <Input
          type="text"
          name="title"
          placeholder="Search..."
          onChange={this.handleChande}
          style={{ marginBottom: '15px' }}
        />
        {/* <FontAwesomeIcon icon="search" size="1x" /> */}
        <ul className="liContainer">{dataList}</ul>
      </>
    );
  }
}

const mapStateToProps = state => ({ data: state.data, favourites: state.favourites });

export default connect(
  mapStateToProps,
  { fetchPaths, fetchFavs, transferSelectedData }
)(PathsList);
