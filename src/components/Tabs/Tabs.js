import React from 'react';
import { Row, Col, TabPane, Table } from 'reactstrap';
import { useStateValue } from '../../providers/ContextProvider';
import { StatusVuelos } from '../../providers/StatusVuelos';
import './Tabs.css';
const Llegadas = (props) => {       
    const [context,] = useStateValue();

    const getVuelos = () => {
            return (props.tipo === "llegadas") ? context.app.vuelos.llegadas : context.app.vuelos.salidas;
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
                                <th scope="col">Status</th>
                                <th scope="col">Hora</th>
                                <th scope="col">Aerolinea</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                getVuelos().map((vuelo, key) => {
                                    return (
                                        <tr key={key}>
                                            <th scope="row">{vuelo.id_vuelo}</th>
                                            <td>{(props.tipo === "llegadas") ? `${vuelo.origen_nombre} (${vuelo.origen_ciudad})` : `${vuelo.destino_nombre} (${vuelo.destino_ciudad})`}</td>
                                            <td>{StatusVuelos(vuelo.id_status)}</td>
                                            <td>{vuelo.time}</td>
                                            <td>{vuelo.aerolinea_nombre}</td>
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