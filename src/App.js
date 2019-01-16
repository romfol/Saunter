import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import { Header } from './components/Header/Header';
import PathsList from './components/PathsList/PathsList';
import PathData from './components/PathData/PathData';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faMapMarkedAlt, faRoute, faCheck } from '@fortawesome/free-solid-svg-icons';

library.add(faMapMarkedAlt, faRoute, faCheck); //icon added

const App = () => {
  return (
    <>
      <Header />
      <Container>
        <Row>
          <Col xs="6">
            <PathsList />
          </Col>
          <Col xs="6">
            <PathData />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default App;
