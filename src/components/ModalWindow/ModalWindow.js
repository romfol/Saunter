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
  FormText,
  ModalFooter,
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

  clearState = () => {
    this.setState({
      title: '',
      shortDescription: '',
      fullDescription: '',
      totalDistance: 0,
      fromPoint: '',
      toPoint: '',
      waypoints: [],
    });
  };

  handleChange = e => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value });
  };

  submitForm = e => {
    e.preventDefault();
    this.props.addPath(this.state);
  };

  render() {
    return (
      <Modal isOpen={this.props.modal} toggle={this.props.toggle} size="xl">
        <Container>
          <ModalHeader toggle={this.props.toggle}>Add new path</ModalHeader>
          <Row>
            <Col xs="12" lg="6">
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
                      id="title"
                      maxLength="15"
                      required
                    />
                    <FormText color="muted" style={{ textAlign: 'right' }}>
                      Must be filled
                    </FormText>
                  </FormGroup>
                  <FormGroup>
                    <Label for="shortDescr">Short description</Label>
                    <Input
                      type="textarea"
                      value={this.state.shortDescription}
                      onChange={this.handleChange}
                      name="shortDescription"
                      placeholder="Text area"
                      id="shortDescr"
                      maxLength="160"
                    />
                    <FormText color="muted" style={{ textAlign: 'right' }}>
                      Limit {this.state.shortDescription.length} of 160
                    </FormText>
                  </FormGroup>
                  <FormGroup>
                    <Label for="fullDescr">Full description</Label>
                    <Input
                      type="textarea"
                      value={this.state.fullDescription}
                      onChange={this.handleChange}
                      name="fullDescription"
                      placeholder="Text area"
                      id="fullDescr"
                    />
                  </FormGroup>
                  <div style={{ textAlign: 'center' }}>
                    <span style={{ fontSize: '25px', display: 'block', margin: '15px' }}>
                      <FontAwesomeIcon
                        icon="route"
                        style={{ marginRight: '15px', color: '#73B9FF' }}
                      />
                      Length: {this.state.totalDistance} km
                    </span>
                    <Button
                      onClick={() => this.props.toggleNested(this.state.title)}
                      type="submit"
                      outline
                      color="success"
                      style={{ margin: '10px' }}
                    >
                      <FontAwesomeIcon
                        icon="check"
                        style={{ marginRight: '10px', color: 'green' }}
                      />
                      Add path
                    </Button>
                    <Modal
                      isOpen={this.props.nestedModal}
                      toggle={this.props.toggleNested}
                      onClosed={this.props.closeAll ? this.props.toggle : undefined}
                    >
                      <ModalHeader>New path added with such data:</ModalHeader>
                      <ModalBody>
                        <div>
                          <span style={{ fontSize: '20px' }}>Title: </span>
                          {this.state.title}
                        </div>
                        <div>
                          <span style={{ fontSize: '20px', wordWrap: 'break-word' }}>
                            Short description:{' '}
                          </span>
                          {this.state.shortDescription}
                        </div>
                        <div>
                          <span style={{ fontSize: '20px', wordWrap: 'break-word' }}>
                            {' '}
                            Full description:{' '}
                          </span>
                          {this.state.fullDescription}
                        </div>
                        <div>
                          <span style={{ fontSize: '20px' }}>Total distance: </span>
                          {this.state.totalDistance} km
                        </div>
                      </ModalBody>
                      <ModalFooter>
                        <Button
                          color="primary"
                          onClick={() => {
                            this.props.toggleAll();
                            this.clearState();
                          }}
                        >
                          Okey
                        </Button>
                      </ModalFooter>
                    </Modal>
                  </div>
                </Form>
              </ModalBody>
            </Col>
            <Col xs="12" lg="6">
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
