import decode from 'jwt-decode';

const isTokenExpired = () => {
    const data = localStorage.getItem('user');
    if(data === null){
        return true;
    }else{
        try{
            const token = JSON.parse(data).token;
            const decoded = decode(token);
            if (decoded.exp < Date.now() / 1000) {
                return true;
            }else{
                return false;
            }
        }catch(err){
            console.error("Token expired error...",err);
        }
    }
}


export default isTokenExpired;