import styles from './RouteItem.module.css';

import { Link } from 'react-router-dom';
import { useContext, useState, useEffect } from 'react';

import { AuthContext } from '../../contexts/AuthContext';

import * as likeService from '../../services/likeService';

export const RouteItem = (route) => {

    const { userId, isAuthenticated } = useContext(AuthContext);

    const [likes, setLikes] = useState(0);
    const [canLike, setCalLike] = useState(0);

    useEffect(() => {
        likeService.getRoutesLikes(route._id)
            .then(result => (
                setLikes(result)
            ))
    });

    useEffect(() => {
        likeService.checkIfUserCanLike(route._id, userId)
        .then(result => {
            setCalLike(result)
        })
    });


    const onLikeClick = () => {
        likeService.onLikeSubmit(route._id);
        setLikes(likes + 1);
    }

    const ifUserCanLike = canLike === 0 && route._ownerId !== userId;

    const path = route.routeId ? 'catalogPlace' : 'catalog';

    return (
        <div className={styles['card-container']}>
            <Link to={`/${path}/${route._id}`} className={styles.divNavigation} >
                <div className={styles.card}>
                    <img className={styles["card-img"]} src={route.imageUrl} alt={route.title} />
                    <h3>{route.title}</h3>
                    <h4>{route.country}</h4>
                    <p>{route.description.length >= 10 ? route.description.slice(0, 20) + '...' : route.description}</p>
                    <p>Likes: {likes}</p>
                </div>
            </Link>
            {(isAuthenticated && ifUserCanLike) && <button onClick={onLikeClick} className="btn-like"><i className="fa-regular fa-thumbs-up"></i></button>}
        </div>
    );


};