import { useState } from 'react';
import { useStateValue } from '../../../providers/ContextProvider';
import Distance from '../../../helpers/getDistance';
import Fetch from '../../../providers/Fetch';
const useAeropuertos = () => {
    const [, dispatch] = useStateValue();
    const [aeropuerto, setAeropuerto] = useState(null);
    const getAeropuertos = async () => {
        try {
            let aeropuertos = await Fetch.get(`aeropuertos`);
            if (aeropuertos.status !== 200) {
                console.error("Problem detected in useAeropuertos");
            } else {
                aeropuertos = aeropuertos.message;
                const geoloc = false;
                if (geoloc && navigator.geolocation && aeropuertos) {
                    const handlePos = ({ coords }) => {
                        const cercano = aeropuertos.reduce((prev, current) => {
                            const distance_prev = Distance(coords.latitude, coords.longitude, prev.latitude, prev.longitude, "K");
                            const distance_current = Distance(coords.latitude, coords.longitude, current.latitude, current.longitude, "K");
                            return (distance_prev < distance_current) ? prev : current;
                        });
                        let id = null;
                        aeropuertos.forEach((a, key) => {
                            if (a.id_aeropuerto === cercano.id_aeropuerto) { id = key; };
                        });
                        aeropuertos.splice(id, 1);
                        aeropuertos.unshift(cercano);
                    };
                    navigator.geolocation.getCurrentPosition(handlePos);
                };
                setAeropuerto(aeropuertos[0]);
                dispatch({ type: 'SET_DATA', data: { aeropuertos: aeropuertos, selector_aeropuerto: aeropuertos[0].id_aeropuerto } });
            };
        }
        catch (err) { 
            console.error(err);
        }
    };
    return [aeropuerto,setAeropuerto,getAeropuertos];
};
export { useAeropuertos };