import { get, post } from '../api/api';

export const login = async (loginData) => {

    return await post('/users/login', loginData);
}

export const register = async (registerData) => {

    return await post('/users/register', registerData);
} 

export const logout = async (token) => {

    return await get('/users/logout', undefined, token );

};

export const getLoggedInUser = async (token) => {

    return await get('/users/me', undefined, token);

}