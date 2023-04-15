import { get, post, del } from '../api/api'

const baseUrl = '/data/places';

export const getAllPlaces = async () => {
    const result = await get('/data/places');
    const routes = Object.values(result);
    return routes;
}

export const getOnePlace = async (placeId) => {
    const result = await get(`${baseUrl}/${placeId}`);  
    return result;
}

export const getAllPlacesInRoute = async (routeId) => {
    const result = await get(`${baseUrl}?where=routeId%3D%22${routeId}%22`);
    const routes = Object.values(result);
    return routes;
}

export const createPlace = async (data) => {
    const result = await post(baseUrl, data);

    return result;
};


export const getPlaceByIdWithOwner = async (placeId) => {
    const searchQuery = encodeURIComponent(`_id="${placeId}"`);
    // const relationQuerry = encodeURIComponent(`author=_ownerId:users`);
    const relationQuerry = encodeURIComponent(`route=routeId:routes`);

    // const result = await get(`${baseUrl}?where=${searchQuery}&load=${relationQuerry}&load=${relationQuerry2}`);
    const result = await get(`${baseUrl}?where=${searchQuery}&load=${relationQuerry}`);
    return result[0];

};

export const deletePlace = async (placeId) => {
    del(`${baseUrl}/${placeId}`);
};

export const getPagePlace = async (pageSize, page) => {
    return await get(`${baseUrl}?pageSize=${pageSize}&offset=${page * pageSize}`);
};