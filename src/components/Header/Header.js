import React, { Component } from 'react';
import { Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import ModalWindow from '../ModalWindow/ModalWindow';
import './styles.css';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
    };
  }

  toggleModal = () => {
    this.setState({
      modal: !this.state.modal,
    });
  };

  render() {
    return (
      <header>
        <div>
          <FontAwesomeIcon icon="walking" size="3x" />

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
