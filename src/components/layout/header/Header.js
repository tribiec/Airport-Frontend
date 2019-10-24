import React, { useContext } from 'react';
import { useStateValue } from '../../../providers/ContextProvider';
import { Link } from 'react-router-dom';
import { Navbar, NavbarBrand, Col } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './Header.css';
const Header = () => {
    const [context,] = useStateValue();
    return (
        <Navbar className="navbar-expand-lg">
            <Col md="4">
                <NavbarBrand href="/">
                    SAV - Sistema de Aeropuertos y Vuelos
                </NavbarBrand>
            </Col>
            <Col md="4" className="d-flex justify-content-center menu-nav">
                {context.app.logged ?
                    <>
                        <Link className="px-3" to="/"><FontAwesomeIcon icon="home" className="mr-2" />Home</Link> | <Link className="px-3" to="/buscar"><FontAwesomeIcon className="mr-2" icon="search" />Buscar Vuelo</Link> | <Link to="/boletos" className="px-3"><FontAwesomeIcon className="mr-2" icon="ticket-alt" />Mis Boletos</Link>
                    </> : ""}
            </Col>

            <Col md="4" className="d-flex justify-content-end align-items-center">
                {context.app.logged ?
                    <div className="d-flex align-items-center">
                        <span className="mr-3">{`${context.user.nombre} ${context.user.apellido}`}</span>
                        <img src="./img/profile.jpg" className="img-fluid rounded-circle mr-5" alt="Cinque Terre" />
                        <div className="trik">
                            <li style={{listStyle: "none"}}>
                                <FontAwesomeIcon icon="angle-down" id="test" className="mr-4" size="lg" />
                                <ul className="ml-n5 mt-1 p-2 py-3 text-center userSettings">
                                    <li>Configuracion</li>
                                    <li>Salir</li>
                                </ul>
                            </li>
                        </div>
                    </div> : ""}
            </Col>

        </Navbar>
    )
}
export default Header;