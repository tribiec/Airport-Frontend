import Fetch from '../../../providers/Fetch'
import { useStateValue } from '../../../providers/ContextProvider';
const useAgencia = () => {
    const [, dispatch] = useStateValue();
    const getAgencias = async (id) => {
        const agencias = await Fetch.get(`aeropuertos/${id}/agencias`);
        if (agencias.status === 200) {
            dispatch({ type: 'SET_AGENCIAS', agencias: agencias.message });
        } else {
            console.error("Agencias error...", agencias);
        }
    };
    return getAgencias;
};
export { useAgencia };