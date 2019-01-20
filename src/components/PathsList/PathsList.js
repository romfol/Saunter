import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPaths, fetchFavs, transferSelectedData } from '../../actions';
import { Alert, Container, Row, Col } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Search from '../Search/Search';
import './styles.css';

class PathsList extends Component {
  state = {
    value: '',
    filteredMatchedIds: [],
  };

  componentDidMount() {
    this.props.fetchPaths();
    this.props.fetchFavs();
  }

  transferData(id, title, distance, description, from, to, waypoints) {
    this.props.transferSelectedData(id, title, distance, description, from, to, waypoints);
  }

  render() {
    const data = this.props.data;
    const favs = this.props.favourites;
    console.log(this.state);
    if (data === null) {
      return <span>No data 
        <FontAwesomeIcon icon="frown" size="1x" style={{ marginLeft: '10px' }} />
        </span>
    }

    let pathsOutput = Object.keys(data);
    if (this.state.value) {
      if (this.state.filteredMatchedIds.length === 0) {
        return (
          <>
            <Search
              transferInput={(value, filteredMatchedIds) =>
                this.setState({
                  value,
                  filteredMatchedIds,
                })
              }
              value={this.state.value}
              filteredMatchedIds={this.state.filteredMatchedIds}
            />
            <span>
              Nothing was found due to request
              <FontAwesomeIcon icon="frown" size="1x" style={{ marginLeft: '10px' }} />
            </span>
          </>
        );
      }
      pathsOutput = this.state.filteredMatchedIds;
    }

    const dataList = pathsOutput.map(id => {
      let path = data[id];

      let favClass = 'fave';
      if (favs === null || !Object.keys(favs).includes(id)) {
        favClass = 'not-fave';
      }

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
        {/* <FontAwesomeIcon icon="search" size="1x" /> */}
        <Search
          transferInput={(value, filteredMatchedIds) =>
            this.setState({
              value,
              filteredMatchedIds,
            })
          }
          value={this.state.value}
          filteredMatchedIds={this.state.filteredMatchedIds}
        />
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
