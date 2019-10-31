/* eslint-disable eqeqeq */
import { useState } from 'react';
import Fetch from '../../../../providers/Fetch';
const useDestinos = () => {
        const [destinos,setDestinos] = useState(null);
    return [destinos];
};
export default useDestinos;