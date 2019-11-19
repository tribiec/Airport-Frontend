import React, { useEffect } from 'react';
import { Card, CardBody, Row, Col } from 'reactstrap';
import Aeropuerto from './Aeropuerto/Aeropuerto'
import initMap from '../../../providers/getMaps';
import './Destino.css';

const Destino = ({ ciudad, destino }) => {

    useEffect(() => {
      Object.keys(destino).forEach(_dest => {
        if (destino[_dest].length > 0) {
          const aeropuertos = [
            {lat: destino[_dest][0].origen_latitude, lng: destino[_dest][0].origen_longitude},
            {lat: destino[_dest][0].destino_latitude, lng: destino[_dest][0].destino_longitude}
          ];
          initMap(aeropuertos,`mapa_${_dest}`);      
        }
      })
  }, []);

  return (
    <div>
      <h2 className="rojo">{ciudad}</h2>
      <Card className="destino">
        <CardBody>
        {Object.keys(destino).map((dest,key) => (
          <Row key={key}>
          <Col xs="8" id={`mapa_${dest}`} className="mapa">

          </Col>
          <Col xs="4" className="info">

          </Col>
        </Row>
        ))}
        </CardBody>
      </Card>
    </div>
  );
};

export default Destino;
