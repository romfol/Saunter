import React, { Component } from 'react';
import { connect } from 'react-redux';
import {} from 'reactstrap';
import ShowPath from '../ShowPath/ShowPath';
import './styles.css';

class PathData extends Component {
  render() {
    const path = this.props.transfered;

    if (path.transfered) {
      return (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span
              style={{
                fontSize: '30px',
                fontWeight: 'bold',
              }}
            >
              {path.title}
            </span>
            <span
              style={{
                fontSize: '30px',
              }}
            >
              {path.distance} km
            </span>
          </div>
          <div style={{ marginBottom: '20px', wordWrap: 'break-word' }}>{path.description}</div>
          <ShowPath from={path.from} to={path.to} waypoints={path.waypoints} />
        </div>
      );
    } else
      return (
        <div style={{ verticalAlign: 'center', textAlign: 'center' }}>
          <span>Select path</span>
        </div>
      );
  }
}

const mapStateToProps = state => ({
  transfered: state.transfered,
});

export default connect(
  mapStateToProps,
  null
)(PathData);
