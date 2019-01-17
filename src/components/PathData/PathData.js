import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'reactstrap';
import ShowPath from '../ShowPath/ShowPath';
import { deletePath } from '../../actions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './styles.css';

class PathData extends Component {
  state = { deleted: false }; //for rerender

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.transfered !== this.props.transfered) {
      this.setState({ deleted: false });
    }
  }

  handleDeletePath(id) {
    console.log(this.state, this.props);
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
          <span style={{ position: 'relative', left: '60px' }}>Select path </span>
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
          <Button onClick={() => this.handleDeletePath(path.key)} color="link">
            Add to favourites
          </Button>
          <Button onClick={() => this.handleDeletePath(path.key)} outline color="danger">
            Remove
          </Button>
        </div>
      );
  }
}

const mapStateToProps = state => ({
  transfered: state.transfered,
});

export default connect(
  mapStateToProps,
  { deletePath }
)(PathData);
