import { get, post } from '../api/api';

export const login = async (loginData) => {

    return await post('/users/login', loginData);
}

export const register = async (registerData) => {

    return await post('/users/register', registerData);
} 

export const logout = async () => {

    return await get('/users/logout' );

};

export const getLoggedInUser = async () => {

    return await get('/users/me');

}

export const editUserData = async (id, data) => {
    return;

};