import dotenv from "dotenv";

dotenv.config()

export default ({ route, method, body }) => {
    const { REACT_APP_API_HOST } = process.env;
    return fetch(`${REACT_APP_API_HOST}/api/${route}`, {
        method: method,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        mode: "cors",
        body: JSON.stringify(body)
    }).then(e => e.json());
}