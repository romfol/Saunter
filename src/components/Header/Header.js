import React, { Component } from 'react';
import { Button, Container, Row, Col } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import ModalWindow from '../ModalWindow/ModalWindow';
import './styles.css';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      nestedModal: false,
      closeAll: false,
    };
  }

  toggleModal = () => {
    this.setState({
      modal: !this.state.modal,
    });
  };

  toggleNested = () => {
    this.setState({
      nestedModal: !this.state.nestedModal,
      closeAll: false,
    });
  };

  toggleAll = () => {
    this.setState({
      nestedModal: !this.state.nestedModal,
      closeAll: true,
    });
  };

  render() {
    return (
      <header>
        <Container>
          <Row>
            <Col xs="12" sm="6" style={{ textAlign: 'center', padding: '0' }}>
              <FontAwesomeIcon icon="walking" size="3x" />
              <span id="main-title">Saunter</span>
            </Col>
            <Col xs="12" sm="6" style={{ textAlign: 'center', padding: '0' }}>
              <Button onClick={this.toggleModal} color="success" size="lg" id="add-path">
                Add Path
              </Button>
              <ModalWindow modal={this.state.modal} toggle={this.toggleModal} />
            </Col>
          </Row>
        </Container>
      </header>
    );
  }
}

export { Header };
