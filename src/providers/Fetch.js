class Fetch {
    inicial({ method, body = null, endpoint }) {
        return new Promise((resolve, reject) => {
            const { REACT_APP_API_HOST } = process.env;
            fetch(`${REACT_APP_API_HOST}/api/${endpoint}`, {
                method,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                mode: "cors",
                body
            }).then(e => resolve(e.json()));
        })
    };

     get(endpoint) {
        return  this.inicial({ method: "GET", endpoint }).then(e => (e))
    };

    post(endpoint, body) {
        return  this.inicial({ method: "POST", endpoint, body: JSON.stringify(body) }).then(e => (e))
    }
};

export default new Fetch();