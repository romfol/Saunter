import React from 'react';
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

export const ModalWindow = props => {
  return (
    <Modal isOpen={props.modal} toggle={props.toggle} size="xl">
      <Container>
        <ModalHeader toggle={props.toggle}>Add new path</ModalHeader>
        <Row>
          <Col xs="6">
            <ModalBody style={{ borderRight: '1px solid #eddede' }}>
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
              <div style={{ textAlign: 'center' }}>
                <Button color="link" style={{ border: '1px solid #eddede' }} onClick={props.toggle}>
                  Add path
                </Button>
              </div>
            </ModalBody>
          </Col>
          <Col xs="6">
            <ModalBody>
              <Map className={'dddd'} style={{ height: '100%' }} />
            </ModalBody>
          </Col>
        </Row>
      </Container>
    </Modal>
  );
};
