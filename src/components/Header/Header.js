import React, { Component } from 'react';
import img from './walkman.ico';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input,
} from 'reactstrap';
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
        <Modal isOpen={this.state.modal} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>Add new path</ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup>
                <Label for="title">Title </Label>
                <Input type="text" name="title" id="shortDesc" />
              </FormGroup>
              <FormGroup>
                <Label for="shortDescr">Short description</Label>
                <Input type="textarea" name="shortDescription" id="shortDesc" />
              </FormGroup>
              <FormGroup>
                <Label for="fullDescr">Full description</Label>
                <Input type="textarea" name="fullDescription" id="fullDescr" />
              </FormGroup>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.toggleModal}>
              Do Something
            </Button>
          </ModalFooter>
        </Modal>
      </header>
    );
  }
}

export { Header };
