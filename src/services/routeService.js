import { get, post, del, put } from '../api/api'



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

export const editRoute = async (routeId, data) => {
    const result = await put(`/data/routes/${routeId}`, data)
    return result;
};

export const getPageRoute = async (pageSize, page) => {
    return await get(`/data/routes?pageSize=${pageSize}&offset=${page * pageSize}`);
};
