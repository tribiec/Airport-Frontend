import { useState } from 'react';
import Fetch from '../../../providers/Fetch'
import { useStateValue } from '../../../providers/ContextProvider';
const useBoletos = () => {
    const [context, dispatch] = useStateValue();
    const [boletos,setBoletos] = useState({});

    const getBoletos = async () => {
        const boletos = await Fetch.get(`user/${context.user.id_user}/boletos`);
        if (boletos.status === 200) {
            console.log(boletos);
            if(boletos.message.length > 0) setBoletos(boletos.message);
        } else {
            console.error("boletos error...", boletos);
        }
    };
    getBoletos();
    return boletos;
};
export default useBoletos;