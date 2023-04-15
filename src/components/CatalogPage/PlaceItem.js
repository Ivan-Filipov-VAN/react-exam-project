import { useState, useEffect, useContext } from 'react';

import { Link } from 'react-router-dom';
import styles from './PlaceItem.module.css';

import { AuthContext } from '../../contexts/AuthContext';

import * as likeService from '../../services/likeService';

export const PlaceItem = (place) => {

    const { userId, isAuthenticated } = useContext(AuthContext);

    const [likes, setLikes] = useState(0);
    const [canLike, setCalLike] = useState(0);

    useEffect(() => {
        likeService.getRoutesLikes(place._id)
            .then(result => (
                setLikes(result)
            ))
    });

    useEffect(() => {
        likeService.checkIfUserCanLike(place._id, userId)
            .then(result => {
                setCalLike(result)
            })
    });

    const onLikeClick = () => {
        likeService.onLikeSubmit(place._id);
        setLikes(likes + 1);
    };

    const onDislikeClick = () => {
        likeService.onDislikeSubmit(place._id, userId);
        setLikes(likes - 1);
    };

    const isOwner = userId === place._ownerId;
    const ifUserCanLike = canLike === 0 && place._ownerId !== userId;

    return (
        <div className={styles['place-item-container']}>
            <Link to={`/catalogPlace/${place._id}`} className={styles['place-item']} >
                <div className={styles['place-item-img-container']}>



                    <img className={styles['place-item-img']} src={place.imageUrl} alt={place.title} />
                </div>
                <div className={styles['place-item-content']}>
                    <h3 className={styles['place-item-title']}>{place.title}</h3>
                    <p className={styles['place-item-country']}>Likes: {likes}</p>
                    <p className={styles['place-item-country']}>{place.country}</p>
                </div>
            </Link>

            {

                (!isOwner && isAuthenticated && ifUserCanLike) && (
                    <div className='buttons'>
                        <button className={styles['btn-like']} onClick={onLikeClick} ><i className="fa-solid fa-thumbs-up"></i></button>
                    </div>
                )

            }

        </div>

    )
}