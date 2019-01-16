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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Map from '../Map/Map';
import { connect } from 'react-redux';
import { addPath } from '../../actions/index';

class ModalWindow extends Component {
  state = {
    title: '',
    shortDescription: '',
    fullDescription: '',
    fromPoint: '',
    toPoint: '',
    waypoints: [],
    totalDistance: 0,
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
    this.props.addPath(this.state);
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
                      placeholder="Text input"
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="shortDescr">Short description</Label>
                    <Input
                      type="textarea"
                      value={this.state.shortDescription}
                      onChange={this.handleChange}
                      name="shortDescription"
                      placeholder="Text area"
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="fullDescr">Full description</Label>
                    <Input
                      type="textarea"
                      value={this.state.fullDescription}
                      onChange={this.handleChange}
                      name="fullDescription"
                      placeholder="Text area"
                    />
                  </FormGroup>
                  <div style={{ textAlign: 'center' }}>
                    <span style={{ fontSize: '25px', display: 'block' }}>
                      <FontAwesomeIcon
                        icon="route"
                        style={{ marginRight: '15px', color: '#73B9FF' }}
                      />
                      Length: {this.state.totalDistance} km
                    </span>
                    <Button type="submit" outline color="success">
                      <FontAwesomeIcon
                        icon="check"
                        style={{ marginRight: '10px', color: 'green' }}
                      />
                      Add path
                    </Button>
                  </div>
                </Form>
              </ModalBody>
            </Col>
            <Col xs="6">
              <ModalBody>
                <Map
                  transferRoutesData={(fromPoint, toPoint, waypoints, totalDistance) =>
                    this.setState({
                      fromPoint,
                      toPoint,
                      waypoints,
                      totalDistance,
                    })
                  }
                  fromPoint={this.state.fromPoint}
                  toPoint={this.state.toPoint}
                  waypoints={this.state.waypoints}
                  totalDistance={this.state.totalDistance}
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
