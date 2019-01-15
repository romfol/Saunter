import React, { Component } from 'react';
import { Button } from 'reactstrap';
import img from './walkman.ico';

import ModalWindow from '../ModalWindow/ModalWindow';
import './styles.css';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: true,
    };
  }

  toggleModal = () => {
    this.setState({
      modal: !this.state.modal,
    });
  };

  render() {
    console.log(this.state.modal);
    return (
      <header>
        <div>
          <img src={img} alt="logo" />
          <span>Saunter</span>
        </div>
        <Button onClick={this.toggleModal} color="primary" size="lg">
          Add Path
        </Button>
        <ModalWindow modal={this.state.modal} toggle={this.toggleModal} />
      </header>
    );
  }
}

export { Header };
