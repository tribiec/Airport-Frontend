import React from 'react';
import { Card, CardText, CardBody, CardTitle, CardSubtitle, Button } from "reactstrap";
const Destino = ({aeropuerto}) => {
    return (
      <div>
        <Card>
          <CardBody>
            <CardTitle>{aeropuerto.ciudad}</CardTitle>
            <CardSubtitle>Card subtitle</CardSubtitle>
            <CardText>Some quick Destino text to build on the card title and make up the bulk of the card's content.</CardText>
            <Button>Button</Button>
          </CardBody>
        </Card>
      </div>
    );
  };
  
  export default Destino;
