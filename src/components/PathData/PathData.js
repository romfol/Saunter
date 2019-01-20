import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'reactstrap';
import ShowPath from '../ShowPath/ShowPath';
import { deletePath, addToFavourites } from '../../actions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './styles.css';

class PathData extends Component {
  state = { deleted: false }; //for rerender

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.transfered.id !== this.props.transfered.id) {
      this.setState({ deleted: false });
    }
  }

  handleDeletePath(id) {
    this.props.deletePath(id);
    this.setState({ deleted: true });
  }

  render() {
    const path = this.props.transfered;

    if (!path.title || this.state.deleted) {
      return (
        <div style={{ marginTop: '30px', textAlign: 'center' }}>
          <FontAwesomeIcon
            icon="long-arrow-alt-left"
            size="4x"
            style={{ color: 'green', position: 'absolute', top: '30px' }}
          />
          <span style={{ position: 'relative', left: '70px' }}>Select path </span>
        </div>
      );
    } else
      return (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div
              style={{
                fontSize: '30px',
                fontWeight: 'bold',
                wordWrap: 'break-word',
              }}
            >
              {path.title.toUpperCase()}
            </div>
            <div
              style={{
                fontSize: '30px',
              }}
            >
              {path.distance} km
            </div>
          </div>
          <div style={{ marginBottom: '20px', wordWrap: 'break-word' }}>{path.description}</div>
          <ShowPath from={path.from} to={path.to} waypoints={path.waypoints} />
          <div style={{ textAlign: 'right' }}>
            <Button
              className="addFav"
              onClick={() => this.props.addToFavourites(path.id)}
              color="link"
            >
              Add to favourites
              {/* <FontAwesomeIcon
                icon="thumbs-up"
                size="2x"
                style={{ color: '#0056BC', paddingLeft: '3px' }}
              /> */}
            </Button>
          </div>
          <div style={{ textAlign: 'right' }}>
            <Button onClick={() => this.handleDeletePath(path.id)} outline color="danger">
              Remove
            </Button>
          </div>
        </div>
      );
  }
}

const mapStateToProps = state => ({
  transfered: state.transfered,
});

export default connect(
  mapStateToProps,
  { deletePath, addToFavourites }
)(PathData);
