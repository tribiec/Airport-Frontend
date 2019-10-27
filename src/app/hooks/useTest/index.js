import { useEffect } from 'react';
const useTest = (id) => {
    useEffect(() => {
        alert(id);
    }, []);
};
export default useTest;