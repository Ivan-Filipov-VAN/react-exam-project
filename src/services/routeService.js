import { get, post } from '../api/api'

export const getAllRoutes = async () => {
    const result = await get('/data/routes');

    const routes = Object.values(result);

    console.log(routes);
    return routes;
}

export const createRoute = async (data, token) => {
    const result = await post('/data/routes', data, token);

    return result;
};

export const getOneRoute = async (routeId) => {
    const result = await get(`/data/routes/${routeId}`);  
    
    return result;
}
