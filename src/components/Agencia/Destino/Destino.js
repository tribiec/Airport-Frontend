import React, { useEffect, useState } from 'react';
import { Card, CardBody, Row, Col } from 'reactstrap';
import { useStateValue } from '../../../providers/ContextProvider';
import initMap from '../../../providers/getMaps';
import Button from '../../Button/Button';
import Ticket from './Ticket/Ticket';
import './Destino.css';

const Destino = ({ ciudad, destino }) => {
  const [modal, setModal] = useState(false);
  const [context,] = useStateValue();

  useEffect(() => {
    if (context.app.map) {
      Object.keys(destino).forEach(_dest => {
        if (destino[_dest].length > 0 && context.app.map) {
          const aeropuertos = [
            { lat: destino[_dest][0].origen_latitude, lng: destino[_dest][0].origen_longitude },
            { lat: destino[_dest][0].destino_latitude, lng: destino[_dest][0].destino_longitude }
          ];
          initMap(aeropuertos, `mapa_${_dest}`);
        }
      });
    }
  }, [context.app.map, destino])

  return (
    <div>
      <h2 className="rojo">{ciudad}</h2>
      <Card className="destino">
        <CardBody>
          {Object.keys(destino).map((dest, key) => (
            <Row key={key}>
              <Col xs="8" id={`mapa_${dest}`} className="mapa">

              </Col>
              <Col xs="4" className="info">
                <div className="w-100 h-100 d-flex flex-column align-items-center justify-content-center">
                    <h5>Aeropuerto: {destino[dest][0].destino_nombre}</h5>
                    <Button color="rojo" onclick={() => setModal(!modal)}>Comprar Boleto</Button>
                    <Ticket modal={modal} toggle={() => setModal(!modal)} vuelos={destino}/>
                </div>
              </Col>
            </Row>
          ))}
        </CardBody>
      </Card>
    </div>
  );
};

export default Destino;
