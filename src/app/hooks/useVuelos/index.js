import Fetch from '../../../providers/Fetch';
import { useStateValue } from '../../../providers/ContextProvider';
const useVuelos = () => {
    const [,dispatch] = useStateValue();
    const getVuelos = async (id) => {
        const vuelos = await Fetch.get(`aeropuertos/${id}/vuelos`);
        if(vuelos.status === 200){
            dispatch({type: 'SET_VUELOS', vuelos: vuelos.message});
        }else{
            console.error("Error en useVuelos...", vuelos);
        };
    };
    return getVuelos;
};
export { useVuelos };