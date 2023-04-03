import { get, post } from "../api/api";



const baseUrl = '/data/comments';

// export const getAllComments = async (routeId) => {
//     const query = encodeURIComponent(`routeId="${routeId}"`);

//     const result = await get(`${baseUrl}?where=${query}`);
//     const comments = Object.values(result);

//     return comments;
// };

export const getAllComments = async (routeId) => {
    const searchQuery = encodeURIComponent(`routeId="${routeId}"`);
    const relationQuerry = encodeURIComponent(`author=_ownerId:users`);

    const result = await get(`${baseUrl}?where=${searchQuery}&load=${relationQuerry}`);
    const comments = Object.values(result);

    return comments;
};

export const createComment = async (routeId, comment) => {
    const result = await post(baseUrl, {routeId, comment});

    return result;
};