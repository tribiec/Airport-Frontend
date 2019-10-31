import { useState } from 'react';
import Fetch from '../../../providers/Fetch'
import { useStateValue } from '../../../providers/ContextProvider';
const useAgencia = () => {
    const [, dispatch] = useStateValue();
    const [agencia,setAgencia] = useState({});

    const getAgencias = async (id) => {
        const agencias = await Fetch.get(`aeropuertos/${id}/agencias`);
        if (agencias.status === 200) {
            if(agencias.message.length > 0) setAgencia(agencias.message[0]);
            dispatch({ type: 'SET_AGENCIAS', agencias: agencias.message });
        } else {
            console.error("Agencias error...", agencias);
        }
    };
    return [agencia,setAgencia,getAgencias];
};
export { useAgencia };