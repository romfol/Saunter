import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPaths } from '../../actions';
import { Alert } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class PathsList extends Component {
  // componentDidUpdate(prevProps, prevState) {
  //   if (prevProps.data !== this.props.data) {
  //     console.log(this.props.data);
  //     //this.showList();
  //   }
  // }

  componentDidMount() {
    this.props.fetchPaths();
  }
  render() {
    const data = this.props.data;
    let dataList = Object.keys(data).map(key => {
      let path = data[key];
      //console.log(key);
      return (
        <Alert color="success" key={key}>
          <FontAwesomeIcon icon="map-marked-alt" />
          {path.title}
        </Alert>
      );
    });

    return (
      <div style={{ overflowY: 'scroll', height: '500px', backgroundColor: 'white' }}>
        {dataList}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    data: state.data,
  };
};

export default connect(
  mapStateToProps,
  { fetchPaths }
)(PathsList);
