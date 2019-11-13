/* eslint-disable eqeqeq */
import { useState } from 'react';
import Fetch from '../../../../providers/Fetch';
const useDestinos = () => {
        const [destinos,setDestinos] = useState([]);
        const getDestinos = async (id) => {
            let agencia = await Fetch.get(`agencias/${id}/vuelos`);
            console.log(`agencias/${id}/vuelos`);
            if(agencia.status === 200){
                let vuelos = agencia.message.vuelos;
                let ciudades = [...new Set(vuelos.map(vuelo => (vuelo.destino_ciudad)))];
                let _destinos = {}
                ciudades.forEach(ciudad => {
                    _destinos[ciudad] = vuelos.filter(vuelo => (vuelo.destino_ciudad === ciudad));
                });
                
            }else{
                console.log("Error desde useDestinos");
            }
        };
    return [destinos,getDestinos];
};
export default useDestinos;