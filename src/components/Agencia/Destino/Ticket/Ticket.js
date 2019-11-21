import React, { useState, useEffect } from 'react';
import { Row, Col, Input, Modal, ModalHeader, ModalBody, ModalFooter, Spinner } from 'reactstrap';
import { useStateValue } from '../../../../providers/ContextProvider';
import Fetch from '../../../../providers/Fetch';
import getDates from '../../../../helpers/getDates';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import DatePicker from 'react-datepicker';
import Cards from 'react-credit-cards';
import Button from '../../../Button/Button';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-credit-cards/es/styles-compiled.css';
import './Ticket.css';

const Ticket = ({ modal, toggle, vuelos }) => {

    let fecha = new Date(Date.now());
    fecha = `${(fecha.getMonth() + 1)}/${fecha.getDate()}/${fecha.getFullYear()}`;

    const monto = 850000; //* Costo de cada boleto, precio constante para todas las rutas

    const [loading, setLoading] = useState(false);

    const [ida, setIda] = useState(true);

    const [vuelo, setVuelo] = useState({
        id_vuelo_salida: null,
        fechaSalida: null,
        horasSalida: [],
        id_vuelo_vuelta: null,
        fechaVuelta: null,
        horasVuelta: [],
        pasajeros: 1
    });

    const [context,] = useStateValue();

    const [card, setCard] = useState({
        cvc: '432',
        expiry: '02/20',
        focus: '',
        name: 'Carlos Tribiec',
        number: '4111111111111111',
        id: '24381320'
    });

    const handleCardInputFocus = (e) => {
        e.preventDefault();
        setCard({ ...card, focus: e.target.name });
    }

    const handleCardInputChange = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        if (["cvc", "number"].includes(name)) {
            if (isNaN(value)) {
                return false;
            } else {
                setCard({ ...card, [name]: value });
            }
        } else if (name === "expiry") {
            const match = new RegExp(/(^(0(([1-9]{1})?)|(1(([0-2]{1})?)))((([/]{1})?)|([/]{1})(([0-3]{1}|(([0-3]{1}))(([0-9]{1})?))?))$)/);
            if (match.test(value) && value !== "") {
                setCard({ ...card, [name]: value });
            } else if (value === "") {
                setCard({ ...card, [name]: "" });
            }
        } else {
            setCard({ ...card, [name]: value });
        }
    }

    const fechaChangeSalida = date => {
        let allVuelos = vuelos[Object.keys(vuelos)[0]].filter(v => (v.date === date.toISOString())).map(v => ({ id_vuelo: v.id_vuelo, time: v.time }));
        setVuelo({ ...vuelo, fechaSalida: date, horasSalida: allVuelos });
    }

    const fechaChangeVuelta = date => {
        let allVuelos = vuelos[Object.keys(vuelos)[0]].filter(v => (v.date === date.toISOString())).map(v => ({ id_vuelo: v.id_vuelo, time: v.time }));
        setVuelo({ ...vuelo, fechaVuelta: date, horasVuelta: allVuelos });
    }

    const comprarBoleto = async (e) => {
        e.preventDefault();
        if (ida) {
            const payload = { user: { ...context.user }, pago: { ...card, monto: (vuelo.pasajeros * monto) }, vuelo: { ...vuelo, id_vuelo_salida: document.querySelector("#horasSalida").value, ida, id_agencia: context.app.selector_agencia } };
            setLoading(true);
            const llamada = await Fetch.post('user/comprar', payload);
            if (llamada.status === 200) {
                alert("Pago Realizado con exito!");
                setLoading(false);
                toggle();
            } else {
                alert("Error en el pago, por favor verificar datos");
            }
        } else if (document.querySelector("#horasSalida").value === document.querySelector("#horasVuelta").value) {
            alert("Debes seleccionar distintas horas de salida...");
        } else {
            console.log({ user: { ...context.user }, pago: { ...card }, vuelo: { ...vuelo, id_vuelo_salida: document.querySelector("#horasSalida").value, id_vuelo_vuelta: document.querySelector("#horasVuelta").value, ida, id_agencia: context.app.selector_agencia } });
        }
    }

    useEffect(() => {
    }, []);

    return (
        <Modal isOpen={modal} toggle={toggle} className="ticket normal">
            <form id="pago" onSubmit={comprarBoleto}>
                <ModalHeader toggle={toggle} className="normal">
                    <p><FontAwesomeIcon icon="shopping-cart" /> Comprar Boleto</p>
                </ModalHeader>
                <ModalBody className="normal">
                    <p><b><FontAwesomeIcon icon="plane-departure" /> Datos de Viaje</b></p>
                    <Row form>
                        <Col>
                            <p>Vuelo: <span className={(ida) ? "font-weight-bold" : ""} onClick={() => setIda(true)}>Ida</span> / <span className={(!ida) ? "font-weight-bold" : ""} onClick={() => setIda(false)}>Ida-Vuelta</span></p>
                        </Col>
                    </Row>
                    <Row form>
                        <Col>
                            <p><FontAwesomeIcon icon="calendar-alt" /> Fecha de Salida</p>
                        </Col>
                        <Col>
                            <DatePicker
                                name="fechaSalida"
                                selected={vuelo.fechaSalida}
                                onChange={fechaChangeSalida}
                                includeDates={getDates(vuelos)}
                                placeholderText={fecha}
                                required
                            />
                        </Col>
                    </Row>
                    <Row form>
                        <Col>
                            <p><FontAwesomeIcon icon="clock" /> Hora de Salida</p>
                        </Col>
                        <Col>
                            <select id="horasSalida" required>
                                {vuelo.horasSalida.map((vuel, key) => (<option key={key} value={vuel.id_vuelo}>Vuelo: #{vuel.id_vuelo} - Hora: {vuel.time}</option>))}
                            </select>
                        </Col>
                    </Row>
                    {(!ida) ? <>
                        <Row form>
                            <Col>
                                <p><FontAwesomeIcon icon="calendar-alt" /> Fecha de Vuelta</p>
                            </Col>
                            <Col>
                                <DatePicker
                                    selected={vuelo.fechaVuelta}
                                    onChange={fechaChangeVuelta}
                                    includeDates={getDates(vuelos)}
                                    placeholderText={fecha}
                                    required
                                />
                            </Col>
                        </Row>
                        <Row form>
                            <Col>
                                <p><FontAwesomeIcon icon="clock" /> Hora de Llegada</p>
                            </Col>
                            <Col>
                                <select id="horasVuelta" required>
                                    {vuelo.horasVuelta.map((vuel, key) => (<option key={key} value={vuel.id_vuelo}>Vuelo: #{vuel.id_vuelo} - Hora: {vuel.time}</option>))}
                                </select>
                            </Col>
                        </Row>
                    </> : ""}


                    <Row form>
                        <Col><p><FontAwesomeIcon icon="user-friends" /> Numero de Pasajeros</p></Col>
                        <Col>
                            <Input type="select" name="pasajeros" value={vuelo.pasajeros} onChange={e => { setVuelo({ ...vuelo, pasajeros: Number(e.target.value) }) }} required>
                                <option value={1}>1</option>
                                <option value={2}>2</option>
                                <option value={3}>3</option>
                                <option value={4}>4</option>
                                <option value={5}>5</option>
                            </Input>
                        </Col>
                    </Row>
                    <p className="mt-5"><b><FontAwesomeIcon icon="credit-card" /> Datos de Pago</b></p>
                    <div id="PaymentForm">
                        <Row form>
                            <Col><Cards
                                cvc={card.cvc}
                                expiry={card.expiry.replace("/", "")}
                                focused={card.focus}
                                name={card.name}
                                number={card.number}
                                placeholders={{ name: 'TU NOMBRE AQUI' }}
                            /></Col>
                            <Col></Col>
                        </Row>
                        <Row form className="mt-4">
                            <Col xs="4"><p>Numero de Tarjeta</p></Col>
                            <Col><input
                                type="tel"
                                name="number"
                                placeholder="Numero de Tarjeta"
                                value={card.number}
                                onChange={handleCardInputChange}
                                onFocus={handleCardInputFocus}
                                minLength={16}
                                maxLength={19}
                                required
                            />
                            </Col>
                        </Row>
                        <Row form className="mt-2">
                            <Col xs="4"><p>CVC</p></Col>
                            <Col><input
                                type="text"
                                pattern="[0-9]{3,5}"
                                name="cvc"
                                placeholder="CVC"
                                value={card.cvc}
                                onChange={handleCardInputChange}
                                onFocus={handleCardInputFocus}
                                minLength={3}
                                maxLength={4}
                                required
                            />
                            </Col>
                        </Row>
                        <Row form className="mt-2">
                            <Col xs="4"><p>Nombre en la Tarjeta</p></Col>
                            <Col><input
                                type="text"
                                name="name"
                                placeholder="Nombre en la tarjeta"
                                pattern="^([a-zA-z]{1,15})(([ ])?)([a-zA-z]{1,15})$"
                                value={card.name}
                                onChange={handleCardInputChange}
                                onFocus={handleCardInputFocus}
                                minLength={5}
                                required
                            />
                            </Col>
                        </Row>
                        <Row form className="mt-2">
                            <Col xs="4"><p>Fecha de Vencimiento</p></Col>
                            <Col><input
                                type="text"
                                name="expiry"
                                placeholder="00/00"
                                value={card.expiry}
                                onChange={handleCardInputChange}
                                onFocus={handleCardInputFocus}
                                minLength={5}
                                maxLength={5}
                                required
                            />
                            </Col>
                        </Row>
                        <Row form className="mt-2">
                            <Col xs="4"><p>Cedula o Rif</p></Col>
                            <Col><input
                                type="text"
                                name="id"
                                placeholder="Cedula o Rif"
                                value={card.id}
                                onChange={handleCardInputChange}
                                onFocus={handleCardInputFocus}
                                minLength={6}
                                maxLength={10}
                                required
                            />
                            </Col>
                        </Row>
                        <Row form className="mt-2">
                            <Col><p>Monto Total: {vuelo.pasajeros * monto} BsS</p></Col>
                        </Row>
                    </div>
                </ModalBody>
                <ModalFooter className="normal">
                    <Button disabled={loading} color="rojo">{(loading) ? <><Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                    /> Procesando Pago...</> : "Comprar Boleto"}</Button>
                </ModalFooter>
            </form>
        </Modal>
    );
}

export default Ticket;
