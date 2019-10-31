import React from "react";
import { CardBox } from "../CardBox/CardBox";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Agencia.css";

const Agencias = ({ agencia, nombre }) => {
  return (
    <div className="vuelos m-5">
      <div className="d-flex justify-content-center align-items-center barra">
        <h1>
          {agencia == null ? "Cargando..." : `${agencia.nombre} (${nombre})`}{" "}
          <FontAwesomeIcon icon="building" />
        </h1>
      </div>
      <CardBox
        title={
          <>
            <h2 className="azul">
              <FontAwesomeIcon icon="suitcase" /> Pagina de Agencia
            </h2>
          </>
        }
        titleAlign={"start"}
        opacity={0.9}
      >
        <div className="d-flex justify-content-center align-items-center agencias">
          <div className="destinos w-75 p-4">
            <h2>
              <FontAwesomeIcon icon="map" /> Destinos
            </h2>
            <CardBox title={"Hola"}>
              Test
            </CardBox>
          </div>
        </div>
      </CardBox>
    </div>
  );
};
export default Agencias;
