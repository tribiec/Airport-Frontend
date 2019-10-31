/* eslint-disable eqeqeq */
import React, { useEffect } from 'react';
import { useStateValue } from '../../providers/ContextProvider'
import { useAeropuertos } from '../../app/hooks/useAeropuertos';
import { useAgencia } from '../../app/hooks/useAgencia';
import { useVuelos } from '../../app/hooks/useVuelos';
import Vuelos from '../../components/Vuelos/Vuelos';
import Agencia from '../../components/Agencia/Agencia';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './Aeropuerto.css';

const Aeropuerto = (props) => {
    const [context, dispatch] = useStateValue();
    const [aeropuerto,setAeropuerto,getAeropuerto] = useAeropuertos();
    const [agencia,setAgencia,getAgencias] = useAgencia();
    const getVuelos = useVuelos();

    useEffect(() => {
        getAeropuerto();
        // eslint-disable-next-line
    },[context.app.logged]); 

    useEffect(() => {
        if(context.app.selector_aeropuerto !== 0){
            getAgencias(aeropuerto.id_aeropuerto);
            getVuelos(aeropuerto.id_aeropuerto);
        }
        // eslint-disable-next-line
    },[context.app.selector_aeropuerto]);

    const handleChangeAeropuerto = (evt) => {
        dispatch({ type: 'SET_AEROPUERTO', aeropuerto: evt.target.value});
        setAeropuerto(context.app.aeropuertos[getKey('aeropuerto',evt.target.value)]);
    };

    const handleChangeAgencia = (evt) => {
        dispatch({ type: 'SET_AGENCIA', agencia: evt.target.value});
        const _agencia = context.app.agencias.filter(a => (a.id_agencia == evt.target.value));
        setAgencia((_agencia.length > 0) ? _agencia[0] : {});
    };

    const getKey = (selector,valor) => {
        let key = null;
        context.app[`${selector}s`].forEach((data, index) => {
            if (data[`id_${selector}`] === valor) {
                key = index;
            };
        });
        return key;
    };

    return (
        <>
            <div className="w-100 pl-5 barra">
                <div className="w-50 d-flex flex-row align-items-center">
                    <span className="text-uppercase mr-2" style={{ lineHeight: "60px" }}><FontAwesomeIcon icon="plane" /> aeropuerto</span>
                    <select className="form-control selector w-25" id="aeropuerto" name="aeropuerto" value={context.app.selector_aeropuerto} onChange={handleChangeAeropuerto}>
                        {context.app.aeropuertos.map((apt, key) => { return <option data-key={key} key={key} id={apt.id_aeropuerto} value={apt.id_aeropuerto}>{apt.nombre} ({apt.ciudad})</option> })}
                    </select>
                    <span className="text-uppercase mx-2" style={{ lineHeight: "60px" }}><FontAwesomeIcon icon="building" /> agencia</span>
                    <select className="form-control selector w-25" id="agencia" name="agencia" value={context.app.selector_agencia || 0} onChange={handleChangeAgencia}>
                        <option key={0} value={0} onClick={()=> { dispatch({type: 'SET_HOME'}) }}>...</option>
                        {context.app.agencias.map((agencia, key) => { return <option key={key} data-key={key} value={agencia.id_agencia}>{agencia.nombre}</option> })}
                    </select>
                </div>
            </div>
            <div className="d-flex justify-content-center">
                {(context.app.selector_agencia === null) ? <Vuelos aeropuerto={aeropuerto} /> : <Agencia nombre={aeropuerto.nombre} agencia={agencia} />}
            </div>
        </>
    );
}
export default Aeropuerto;