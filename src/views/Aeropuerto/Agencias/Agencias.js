import React, { useContext } from "react";
import { useCargarVuelos } from "../../../app/hooks/useCargarVuelos";
import { Table } from "reactstrap";
import { CardBox } from "../../../components/Card/CardBox";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Context } from "../../../providers/ContextProvider";
import "./Agencias.css";

const Agencias = ({ agencia, nombre }) => {
  const [context] = useContext(Context);
  const destinos = useCargarVuelos(agencia.id_agencia);
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
            <Table className="text-uppercase text-center">
              <thead>
                <tr>
                  <th>Ciudad</th>
                  <th>Aeropuerto</th>
                  <th></th>
                </tr>
              </thead>
              <tbody className="font-weight-bold">
                {Object.keys(destinos).map((destino, key) => {
                  const aeropuerto = context.app.aeropuertos.filter(
                    apt => apt.id_aeropuerto === destino
                  )[0];
                  return (
                    <tr key={key}>
                      <td>{aeropuerto.ciudad}</td>
                      <td>{aeropuerto.nombre}</td>
                      <td>
                        <button className="p-2">
                          Comprar Boleto <FontAwesomeIcon icon="ticket-alt" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </div>
        </div>
      </CardBox>
    </div>
  );
};
export default Agencias;
