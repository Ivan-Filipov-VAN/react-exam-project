import { get, post, del } from '../api/api'

export const getAllRoutes = async () => {
    const result = await get('/data/routes');
    const routes = Object.values(result);
    return routes;
}

export const createRoute = async (data) => {
    const result = await post('/data/routes', data);

    return result;
};

export const getOneRoute = async (routeId) => {
    const result = await get(`/data/routes/${routeId}`);  
    return result;
}

export const deleteRoute = async (routeId) => {
    del(`/data/routes/${routeId}`);
};
