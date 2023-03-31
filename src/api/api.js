
const host = 'http://localhost:3030';

const request = async (url, method, data) => {

    const options = {
        method,
        headers: {}
    };

    if (data !== undefined) {

        options.headers['Content-Type'] = 'application/json';
        options.body = JSON.stringify(data);
    }

    let token = undefined;
    const seliazedAuth = localStorage.getItem('auth');
    
    if (seliazedAuth) {
        const auth = JSON.parse(seliazedAuth);
        token = auth.accessToken; 
    }

    if (token) {
        options.headers['X-Authorization'] = token;
    }

    try {

        const res = await fetch(host + url, options);

        if (res.ok === false) {

            

            if (res.status === 403) {

                

                //todo clear userData
                localStorage.clear();
                
                console.log('before return');
                const error = await res.json();
                throw new Error(error.message);;

            }

            const error = await res.json();
            throw new Error(error.message);
        }

        if (res.status === 204) {
            return res;
        } else {
            return res.json();
        }

    } catch (err) {

        alert(err.message);
        throw err;
    }
}

export const get = async (url, data, token) => {
    return request(url, 'get', data, token);
}

export const post = async (url, data, token) => {
    return request(url, 'post', data, token);
}


export const put = async (url, data) => {
    return request(url, 'put', data);
}

export const del = async (url) => {
    return request(url, 'delete');
}

