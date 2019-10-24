import React from 'react';
import { Row, Col, TabPane, Table } from 'reactstrap';
import { useStateValue } from '../../providers/ContextProvider';
import { StatusVuelos } from '../../providers/StatusVuelos';
import './Tabs.css';
const Llegadas = (props) => {       
    const [context,dispatch] = useStateValue();

    const getVuelos = () => {
            return (props.tipo === "llegadas") ? context.app.vuelos.llegadas : context.app.vuelos.salidas;
    };

    const handleAgenciaClick = (evt) => {
        alert(`Para ir a la Agencia "${evt.target.getAttribute('agencia_nombre')}", debes seleccionar el Aeropuerto "${evt.target.getAttribute('nombre')}" en el selector de Aeropuertos y luego la Agencia`);
    };

    const handleAirportClick = (evt) => {

    };

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
                                getVuelos().map((vuelo, key) => {
                                    return (
                                        <tr key={key}>
                                            <th scope="row">{vuelo.id_vuelo}</th>
                                            <td onClick={handleAirportClick} id="airportClick">{(props.tipo === "llegadas") ? `${vuelo.origen_ciudad} (${vuelo.origen_nombre})` : `${vuelo.destino_nombre} (${vuelo.destino_ciudad})`}</td>
                                            <td>{vuelo.time}</td>
                                            <td>Estelar</td>
                                            <td>{StatusVuelos(vuelo.id_status)}</td>
                                            <td nombre={(props.tipo === "llegadas") ? vuelo.origen_nombre : vuelo.destino_nombre} agencia_nombre={vuelo.agencia_nombre} id_agencia={vuelo.id_agencia} id={(props.tipo === "llegadas") ? vuelo.origen_id : vuelo.destino_id} onClick={handleAgenciaClick} className="">{vuelo.agencia_nombre}</td>
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