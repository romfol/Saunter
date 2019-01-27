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
    const { value } = e.target;
    this.setState({ value });

    if (value) {
      const currentData = this.props.data;
      const filteredMatchedIds = Object.keys(currentData).filter(id => {
        const path = currentData[id];
        return (
          path.title.toLowerCase().includes(value.toLowerCase()) ||
          path.fullDescription.toLowerCase().includes(value.toLowerCase())
        );
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
