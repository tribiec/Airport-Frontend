import React, { useContext } from 'react';
import { Context } from '../../providers/ContextProvider'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Vuelos from './Vuelos/Vuelos';
import Agencias from './Agencias/Agencias';
import Fetch from '../../providers/Fetch';
import cargarAeropuertos from '../../app/hooks/useCargarAeropuertos/';
import './Aeropuerto.css';
const Aeropuerto = (props) => {
    const [context, dispatch] = useContext(Context);

    cargarAeropuertos();

    const getAirports = () => {
        return (context.app.aeropuerto_actual == null) ? [] : context.app.aeropuertos;
    };

    const getAgencies = () => {
        return (context.app.agencias == null) ? [] : context.app.agencias;
    };

    //* Event Handlers
    const handleChangeAiport = async (evt) => {
        const id_target = evt.target.value;
        const icao_target = evt.target.id;
        //* Get Agencias
        let agencias = await Fetch.get(`aeropuertos/${icao_target}/agencias/`);
        agencias = (agencias.status !== 200) ? [] : agencias.message;
        let vuelos = await Fetch.get(`aeropuertos/${icao_target}/vuelos/`);
        vuelos = (vuelos.status === 404) ? [] : { llegadas: vuelos.message.llegadas, salidas: vuelos.message.salidas };
        dispatch({ user: context.user, app: { ...context.app, aeropuerto_actual: context.app.aeropuertos[id_target], agencias, agencia_actual: null, vuelos } });
    }

    const handleChangeAgency = (evt) => {
        const id_target = evt.target.getAttribute('data-key');
        dispatch({ user: context.user, app: { ...context.app, agencia_actual: context.app.agencias[id_target] } });
    }
    
    return (
        <>
            <div className="w-100 pl-5 barra">
                <div className="w-50 d-flex flex-row align-items-center">
                    <span className="text-uppercase mr-2" style={{ lineHeight: "60px" }}><FontAwesomeIcon icon="plane" /> aeropuerto</span>
                    <select className="form-control selector w-25" id="aeropuerto" name="aeropuerto">
                        {getAirports().map((aeropuerto, key) => { return <option key={key} id={aeropuerto.id_aeropuerto} value={key} onClick={handleChangeAiport}>{aeropuerto.nombre} ({aeropuerto.ciudad})</option> })}
                    </select>
                    <span className="text-uppercase mx-2" style={{ lineHeight: "60px" }}><FontAwesomeIcon icon="building" /> agencia</span>
                    <select className="form-control selector w-25" type="select" id="agencia" name="agencia">
                        <option key={0} value={0} onClick={() => { dispatch({ user: context.user, app: { ...context.app, agencia_actual: null } }) }}>...</option>
                        {getAgencies().map((agencia, key) => { return <option key={key} data-key={key} value={agencia.id_agencia} onClick={handleChangeAgency}>{agencia.nombre}</option> })}
                    </select>
                </div>
            </div>
            <div className="d-flex justify-content-center">

                {(context.app.agencia_actual == null) ? <Vuelos aeropuerto={context.app.aeropuerto_actual} /> : <Agencias nombre={context.app.aeropuerto_actual.nombre} agencia={context.app.agencia_actual} />}

            </div>
        </>
    )
}
export default Aeropuerto;