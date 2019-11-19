import React from 'react';
import { Row, Col } from 'reactstrap';
import initMap from '../../../../providers/getMaps';
import './Aeropuerto.css';

const Aeropuerto = ({ciudad}) => {
    return (
        <Row>
        <Col xs="8">
          <div id={`map-${ciudad}`}></div>
        </Col>
        <Col xs="4"></Col>
        </Row>
    );
}

export default Aeropuerto;