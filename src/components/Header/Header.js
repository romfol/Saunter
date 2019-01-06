import React from 'react';
import img from './walkman.ico';
import { Button } from 'reactstrap';
import './styles.css';

const Header = () => {
  return (
    <header>
      <div>
        <img src={img} alt="" />
        <span>Saunter</span>
      </div>
      <Button color="primary" size="lg">
        Add Path
      </Button>
    </header>
  );
};

export { Header };
