import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import { Header } from './components/Header/Header';
import PathsList from './components/PathsList/PathsList';
import PathData from './components/PathData/PathData';

const App = () => {
  return (
    <React.Fragment>
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
    </React.Fragment>
  );
};

export default App;
