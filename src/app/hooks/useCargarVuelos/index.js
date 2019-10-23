import { useEffect, useState, useContext } from 'react';
import Fetch from '../../../providers/Fetch';
import { Context } from '../../../providers/ContextProvider';

export const useCargarVuelos = (id_agencia) => {
    const [context, ] = useContext(Context);
    const [vuelos, setVuelos] = useState([]);
    useEffect(() => {
        const cargarVuelo = async () => {
            let _vuelos = (await Fetch.get(`aeropuertos/${context.app.aeropuerto_actual.id_aeropuerto}/agencias/${id_agencia}`)).message.vuelos;
            let ciudades = [...new Set(_vuelos.map(vuelo => (vuelo.id_aeropuerto)))];
            let vuelosCiudades = {};
            ciudades.forEach(ciudad => {
                vuelosCiudades[ciudad] = _vuelos.filter(vuelo => (vuelo.id_aeropuerto === ciudad));
            });
            setVuelos(vuelosCiudades)
        }
        cargarVuelo();
    },[id_agencia]);
    return vuelos;
};