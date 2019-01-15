import React, { Component } from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
  Container,
  Row,
  Col,
} from 'reactstrap';
import Map from '../Map/Map';
import { connect } from 'react-redux';
import { addPath } from '../../actions/index';

class ModalWindow extends Component {
  // constructor(props) {
  //   super(props);
  // }
  state = {
    title: 'Text input',
    shortDescription: 'Text area',
    fullDescription: 'Text area',
    fromPoint: '',
    toPoint: '',
    waypoints: [],
  };

  handleChange = e => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value });
  };

  submitForm = e => {
    e.preventDefault();
    console.log(11, this, this.props, this.state);
    this.props.toggle();
    addPath();
  };
  render() {
    return (
      <Modal isOpen={this.props.modal} toggle={this.props.toggle} size="xl">
        <Container>
          <ModalHeader toggle={this.props.toggle}>Add new path</ModalHeader>
          <Row>
            <Col xs="6">
              <ModalBody style={{ borderRight: '1px solid #eddede' }}>
                <Form onSubmit={this.submitForm}>
                  <FormGroup>
                    <Label for="title">Title </Label>
                    <Input
                      type="text"
                      value={this.state.title}
                      onChange={this.handleChange}
                      name="title"
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="shortDescr">Short description</Label>
                    <Input
                      type="textarea"
                      value={this.state.shortDescription}
                      onChange={this.handleChange}
                      name="shortDescription"
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="fullDescr">Full description</Label>
                    <Input
                      type="textarea"
                      value={this.state.fullDescription}
                      onChange={this.handleChange}
                      name="fullDescription"
                    />
                  </FormGroup>
                  <div style={{ textAlign: 'center' }}>
                    <Button type="submit" color="link" style={{ border: '1px solid #eddede' }}>
                      Add path
                    </Button>
                  </div>
                </Form>
              </ModalBody>
            </Col>
            <Col xs="6">
              <ModalBody>
                <Map
                  transferRoutesData={(fromPoint, toPoint, waypoints) =>
                    this.setState({ fromPoint, toPoint, waypoints })
                  }
                  fromPoint={this.state.fromPoint}
                  toPoint={this.state.toPoint}
                  waypoints={this.state.waypoints}
                  style={{ height: '100%' }}
                />
              </ModalBody>
            </Col>
          </Row>
        </Container>
      </Modal>
    );
  }
}

export default connect(
  null,
  { addPath }
)(ModalWindow);
