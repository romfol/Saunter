import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import { Header } from './components/Header/Header';
import PathsList from './components/PathsList/PathsList';
import PathData from './components/PathData/PathData';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faMapMarkedAlt,
  faRoute,
  faCheck,
  faWalking,
  faArrowCircleRight,
  faLongArrowAltLeft,
  faThumbsUp,
  faStar,
  faSearch,
} from '@fortawesome/free-solid-svg-icons';

library.add(
  faMapMarkedAlt,
  faRoute,
  faCheck,
  faWalking,
  faArrowCircleRight,
  faLongArrowAltLeft,
  faThumbsUp,
  faStar,
  faSearch
); //icons added

const App = () => {
  return (
    <>
      <Header />
      <Container>
        <Row>
          <Col xs="12" lg="6">
            <PathsList />
          </Col>
          <Col xs="12" lg="6" style={{ borderLeft: '1px solid grey' }}>
            <PathData />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default App;
