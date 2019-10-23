import React, { useContext } from 'react';
import { Row, Col, TabPane, Table } from 'reactstrap';
import { Context } from '../../providers/ContextProvider';
import { StatusVuelos } from '../../providers/StatusVuelos';
import './Tabs.css';
const Llegadas = (props) => {       
    const [context,dispatch] = useContext(Context);
    const getLlegadas = () => {
        if (context.app.vuelos == null) {
            return [];
        }else{
            return (props.tipo === "llegadas") ? context.app.vuelos.llegadas : context.app.vuelos.salidas;
        }
    }
    const handleAgenciaClick = (evt) => {
        dispatch({ user: context.user, app: { ...context.app, agencia_actual: context.app.agencias[evt.target.id]}});
        document.querySelector("#agencia").value = evt.target.id;
    }
    const handleAirportClick = (evt) => {

    }
    return (
        <TabPane tabId={(props.tipo === "llegadas" ? "1" : "2")}>
            <Row>
                <Col sm="12">
                    <Table className="text-uppercase text-center">
                        <thead>
                            <tr>
                                <th scope="col"># Vuelo</th>
                                <th scope="col">{(props.tipo === "llegadas") ? "Origen" : "Destino"}</th>
                                <th scope="col">Hora</th>
                                <th scope="col">Aerolinea</th>
                                <th scope="col">Status</th>
                                <th scope="col">Agencia</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                getLlegadas().map((vuelo, key) => {
                                    return (
                                        <tr key={key}>
                                            <th scope="row">{vuelo.id_vuelo}</th>
                                            <td onClick={handleAirportClick} id="airportClick">{(props.tipo === "llegadas") ? `${vuelo.origen_ciudad} (${vuelo.origen_nombre})` : `${vuelo.destino_nombre} (${vuelo.destino_ciudad})`}</td>
                                            <td>{vuelo.time}</td>
                                            <td>Estelar</td>
                                            <td>{StatusVuelos(vuelo.id_status)}</td>
                                            <td id={vuelo.id_agencia} onClick={handleAgenciaClick} className="">{vuelo.agencia_nombre}</td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </TabPane>
    )
}
export default Llegadas;