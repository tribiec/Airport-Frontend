import { useState } from 'react';
import Fetch from '../../../../providers/Fetch';
import getCiudades from '../../../../helpers/getCiudades';
const useDestinos = () => {
    const [destinos, setDestinos] = useState([]);
    const getDestinos = async (id) => {
        let agencia = await Fetch.get(`agencias/${id}/vuelos`);
        if (agencia.status === 200) {
            setDestinos(getCiudades([...agencia.message]));
        } else {

        }
    };
    return [destinos, getDestinos];
};
export default useDestinos;