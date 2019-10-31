import React, { useState } from 'react';
import { TabContent, Nav, NavItem, NavLink } from 'reactstrap';
import { CardBox } from '../CardBox/CardBox';
import Tabs from '../Tabs/Tabs';
import classnames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './Vuelos.css';

const Vuelos = ({ aeropuerto }) => {
    const [activeTab, setActiveTab] = useState('1');
    const toggle = tab => {
        if (activeTab !== tab) setActiveTab(tab);
    };
    return (
        <div className="vuelos m-5">
            <div className="d-flex justify-content-center align-items-center barra">
                <h1>{(aeropuerto == null) ? "Cargando..." :
                    `${aeropuerto.nombre} (${aeropuerto.ciudad})`} <FontAwesomeIcon icon="globe-americas" /></h1>
            </div>
            <CardBox title={<><h2>Todos los vuelos</h2></>} titleAlign={"start"} opacity={0.5}>
                <div className="m-3">
                    <h2 className="mb-4">Para comprar boletos, seleccione una agencia</h2>
                    <Nav tabs>
                        <NavItem>
                            <NavLink className={classnames({ active: activeTab === '1' })} onClick={() => { toggle('1'); }}>
                                <FontAwesomeIcon icon="plane-arrival" /> llegadas
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink className={classnames({ active: activeTab === '2' })} onClick={() => { toggle('2'); }}>
                                <FontAwesomeIcon icon="plane-departure" /> salidas
                            </NavLink>
                        </NavItem>
                    </Nav>
                    <TabContent className="p-4 overflow-auto" activeTab={activeTab}>
                        <Tabs tipo="llegadas" />
                        <Tabs tipo="salidas" />
                    </TabContent>
                </div>
            </CardBox>
        </div>
    )
}
export default Vuelos;