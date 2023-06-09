import { post, get, del } from "../api/api";


export const onLikeSubmit = async (routeId) => {
    post('/data/likes', {routeId});
};

export const getRoutesLikes = async(routeId) => {
    return get(`/data/likes?where=routeId%3D%22${routeId}%22&distinct=_ownerId&count`);
};

export const checkIfUserCanLike = (routeId, userId) => {
    return get(`/data/likes?where=routeId%3D%22${routeId}%22%20and%20_ownerId%3D%22${userId}%22&count`);
} 

export const onDislikeSubmit = async (routeId, userId) => {
    const likeId = await get(`/data/likes?where=routeId%3D%22${routeId}%22%20and%20_ownerId%3D%22${userId}%22`);
    del(`/data/likes/${likeId[0]._id}`);
}