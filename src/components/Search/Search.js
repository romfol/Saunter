import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Input } from 'reactstrap';

class Search extends Component {
  state = {
    filteredMatchedIds: [],
    value: '',
  };

  componentDidUpdate(prevState) {
    if (prevState.value !== this.state.value) {
      this.props.transferInput(this.state.value, this.state.filteredMatchedIds);
    }
  }

  handleChange = e => {
    this.setState({ value: e.target.value });

    if (e.target.value) {
      const currentData = this.props.data;
      const filteredMatchedIds = Object.keys(currentData).filter(id => {
        const path = currentData[id];
        const filteredData = Object.keys(path).filter(id => {
          if (id === 'title' || id === 'fullDescription') {
            const pathData = path[id];
            const lc = pathData.toLowerCase();
            const filter = e.target.value.toLowerCase();
            if (lc.includes(filter)) {
              return true;
            }
          }
          return null;
        });
        return filteredData.length > 0;
      });
      this.setState({
        filteredMatchedIds,
      });
    }
  };

  render() {
    return (
      <Input
        type="text"
        name="title"
        placeholder="Search..."
        onChange={this.handleChange}
        value={this.state.value}
        style={{ marginBottom: '15px' }}
      />
    );
  }
}

const mapStateToProps = state => ({ data: state.data });

export default connect(
  mapStateToProps,
  null
)(Search);
