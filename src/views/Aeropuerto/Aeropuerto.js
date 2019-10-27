import React, { useEffect } from 'react';
import { useStateValue } from '../../providers/ContextProvider'
import { useAeropuertos } from '../../app/hooks/useAeropuertos';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useAgencia } from '../../app/hooks/useAgencia';
import { useVuelos } from '../../app/hooks/useVuelos';
import Vuelos from './Vuelos/Vuelos';
import Agencias from './Agencias/Agencias';
import './Aeropuerto.css';

const Aeropuerto = (props) => {
    const [context, dispatch] = useStateValue();
    const getAeropuertos = useAeropuertos();
    const getAgencias = useAgencia();
    const getVuelos = useVuelos();
    
    useEffect(() => {
        getAeropuertos();
    }, []);

    useEffect(() => {
        if(context.app.aeropuerto_actual != null){
            const id = context.app.aeropuerto_actual.id_aeropuerto;
            getAgencias(id);
            getVuelos(id);
        };
    }, [context.app.aeropuerto_actual]);

    const handleChangeAiport = (evt) => {
        const target = { id: evt.target.getAttribute('data-key'), icao: evt.target.id };
        dispatch({ type: 'SET_AEROPUERTO', aeropuerto: context.app.aeropuertos[target.id] });
    };

    const handleChangeAgency = (evt) => {
        const id_target = evt.target.getAttribute('data-key');
        dispatch({ type: 'SET_AGENCIA', agencia: context.app.agencias[id_target] });
    };

    const handleSelectorAero = (evt) => {
        dispatch({ type: 'SET_SELECTOR_AERO', selector: evt.target.value})
    }

    const handleSelectorAgencia = (evt) => {
        dispatch({ type: 'SET_SELECTOR_AGENCIA', selector: evt.target.value})
    }

    const show = () => {
        console.log(context);
    }

    return (
        <>
            <div className="w-100 pl-5 barra">
                <div className="w-50 d-flex flex-row align-items-center">
                    <span className="text-uppercase mr-2" style={{ lineHeight: "60px" }}><FontAwesomeIcon icon="plane" /> aeropuerto <span onClick={show}>Click</span></span>
                    <select className="form-control selector w-25" id="aeropuerto" name="aeropuerto" value={context.app.selector_aero} onChange={handleSelectorAero}>
                        {context.app.aeropuertos.map((aeropuerto, key) => { return <option data-key={key} key={key} id={aeropuerto.id_aeropuerto} value={aeropuerto.id_aeropuerto} onClick={handleChangeAiport}>{aeropuerto.nombre} ({aeropuerto.ciudad})</option> })}
                    </select>
                    <span className="text-uppercase mx-2" style={{ lineHeight: "60px" }}><FontAwesomeIcon icon="building" /> agencia</span>
                    <select className="form-control selector w-25" id="agencia" name="agencia" value={context.app.selector_agencia} onChange={handleSelectorAgencia}>
                        <option key={0} value={0} onClick={()=> { dispatch({type: 'SET_HOME'}) }}>...</option>
                        {context.app.agencias.map((agencia, key) => { return <option key={key} data-key={key} value={agencia.id_agencia} onClick={handleChangeAgency}>{agencia.nombre}</option> })}
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