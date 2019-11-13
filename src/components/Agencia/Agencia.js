import React, { useEffect } from "react";
import CardBox from "../CardBox/CardBox";
import Destino from './Destino/Destino';
import useDestinos from '../../app/hooks/useAgencia/useDestinos';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Agencia.css";
const Agencias = ({ agencia, aeropuerto }) => {
  const [destinos, getDestinos] = useDestinos();

  useEffect(() => {
    getDestinos(agencia.id_agencia);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [agencia.id_agencia]);

  const BarraAgencia = () => (<><h2 className="azul"><FontAwesomeIcon icon="suitcase" /> Pagina de Agencia</h2></>);
  const BarraDestinos = () => (<><h1 className="rojo">Destinos</h1></>);
  return (
    <div className="vuelos m-5">
      <div className="d-flex justify-content-center align-items-center barra">
        <h1>
          {agencia.nombre}
          <FontAwesomeIcon icon="building" />
          ({aeropuerto}) 
        </h1>
      </div>
      <CardBox title={<BarraAgencia />} opacity={0.9}>
        <div className="d-flex justify-content-center align-items-center agencias">
          <CardBox title={<BarraDestinos/>} titleAlign={"start"} width={75}>
          <div className="destinos p-4">
            {destinos.map((destino, key) => (
              <div key={key}>
                <Destino aeropuerto={destino} />
              </div>
            ))}
          </div>
          </CardBox>
        </div>
      </CardBox>
    </div>
  );
};
export default Agencias;
