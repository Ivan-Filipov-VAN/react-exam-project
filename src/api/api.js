//import current user's token
// import { useContext } from "react";
// import { AuthContext } from "../contexts/AuthContext";

const host = 'http://localhost:3030';



const request = async (url, method, data, token) => {

    //import current user's token
    // const { onRegisterSubmit } = useContext(AuthContext);

    // async function request(url, method, data) {
    const options = {
        method,
        headers: {}
    };

    console.log(data);

    // if (data !== undefined && Object.keys(data).length !== 0) {
    if (data !== undefined) {

        options.headers['Content-Type'] = 'application/json';
        options.body = JSON.stringify(data);
    }

    // const userData = getUserData();
    // if (userData) {
    //     options.headers['X-Authorization'] = userData.accessToken;
    // }

    if (token) {
        options.headers['X-Authorization'] = token;
    }

    try {

        const res = await fetch(host + url, options);

        if (res.ok === false) {

            if (res.status === 403) {

                //todo clear userData
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

// export const get = async (url) => {
export const get = async (url, data, token) => {
    // export async function get(url) {
    return request(url, 'get', data, token);
}

export const post = async (url, data, token) => {
    // export async function post(url, data) {
    return request(url, 'post', data, token);
}


export const put = async (url, data) => {
    // export async function put(url, data) {
    return request(url, 'put', data);
}

export const del = async (url) => {
    // export async function del(url) {
    return request(url, 'delete');
}

