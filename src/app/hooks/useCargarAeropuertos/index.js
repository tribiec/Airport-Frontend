import { useContext, useEffect } from 'react';
import { Context } from '../../../providers/ContextProvider';
import Distance from '../../../providers/Distance';
import Fetch from '../../../providers/Fetch';
const useCargarAeropuertos = () => {
    const [context, dispatch] = useContext(Context);
    useEffect(() => {
        //? Cargando Aeropuertos
        const cargarAeropuertos = async () => {
            let aeropuertos = await Fetch.get('aeropuertos/');
            aeropuertos = (aeropuertos.status === 200) ? aeropuertos.message : [];
            const activeGeolocation = false;
            if (navigator.geolocation && activeGeolocation) {
                const getCercano = ({ coords }) => {
                    let matchAeropuerto = { id: null, distance: null };
                    aeropuertos.forEach((aeropuerto, key) => {
                        const distancia = Distance(coords.latitude, coords.longitude, aeropuerto.latitude, aeropuerto.longitude, "K");
                        matchAeropuerto = (matchAeropuerto.distance > distancia || matchAeropuerto.distance == null) ? { id: key, distancia } : matchAeropuerto;
                    })
                    //? Seleccionar agencia mas cercana y ponerla de primera
                    const temporalAeropuerto = aeropuertos[matchAeropuerto.id];
                    aeropuertos.splice(matchAeropuerto.id, 1);
                    aeropuertos.unshift(temporalAeropuerto);
                }
                navigator.geolocation.getCurrentPosition(getCercano);
            }
            let agencias = await Fetch.get(`aeropuertos/${aeropuertos[0].id_aeropuerto}/agencias/`);
            agencias = (agencias.status === 404) ? [] : agencias.message;
            //? Cargar Vuelos
            let vuelos = await Fetch.get(`aeropuertos/${aeropuertos[0].id_aeropuerto}/vuelos/`);
            vuelos = (vuelos.status === 404) ? [] : { llegadas: vuelos.message.llegadas, salidas: vuelos.message.salidas };
            dispatch({ user: context.user, app: { ...context.app, aeropuertos, aeropuerto_actual: (aeropuertos[0] || null), agencias, vuelos } });

        }
        cargarAeropuertos();    
    }, []);
}
export default useCargarAeropuertos;