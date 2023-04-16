import styles from './PlaceDetailsPage.module.css';
import { Link, useParams } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';

import { AuthContext } from '../../contexts/AuthContext';
import { RouteContext } from '../../contexts/RouteContext';

import * as placeService from '../../services/placeService';
import * as routeService from '../../services/routeService';
import * as likeService from '../../services/likeService';

export const PlaceDetailsPage = () => {

    const { placeId } = useParams();

    const [place, setPlace] = useState({});
    const [route, setRoute] = useState(undefined);

    const [likes, setLikes] = useState(0);
    const [canLike, setCalLike] = useState(0);

    const { userId, isAuthenticated } = useContext(AuthContext);
    const { onDeletePlace } = useContext(RouteContext);


    useEffect(() => {

        // placeService.getPlaceByIdWithOwner (placeId)
        placeService.getOnePlace(placeId)
            .then(res => {
                console.log(res)

                routeService.getOneRoute(res.routeId)
                    .then(result => setRoute(result))
                    .catch(res => setRoute(undefined));

                setPlace(res)
            })

    }, [placeId]);

    // useEffect(() => {
    //     routeService.getOneRoute(place.routeId)
    //         .then(res => {
    //             console.log(res)
    //             setRoute(res)
    //         })
    // }, [place]);

    useEffect(() => {
        likeService.getRoutesLikes(placeId)
            .then(result => (
                setLikes(result)
            ))
    });

    useEffect(() => {
        likeService.checkIfUserCanLike(placeId, userId)
            .then(result => {
                setCalLike(result)
            })
    });

    const isOwner = userId === place._ownerId;

    const onDeletePlaceClick = (placeId) => {
        console.log(placeId);
        onDeletePlace(placeId);

    };

    const ifUserCanLike = canLike === 0 && place._ownerId !== userId;

    const onLikeClick = () => {
        likeService.onLikeSubmit(placeId);
        setLikes(likes + 1);
    }

    const onDislikeClick = () => {
        likeService.onDislikeSubmit(placeId, userId);
        setLikes(likes - 1);
    }

    return (
        <>
            <div className={styles['place-details-container']} >
                <div className={styles['place-description-container']}>
                    <h2 className={styles['place-description-title']} >Description:</h2>
                    <p className={styles['place-description-content']} >{place.description}</p>
                </div>

                <div className={styles['place-info-container']}>
                    <h2 className={styles['place-info-title']} >{place.title}</h2>
                    <p className={styles['place-info-text']}>country:</p>
                    <p className={styles['place-info-location']}>{place.country}</p>
                    <p className={styles['place-info-location']}>Likes: {likes}</p>
                    <p className={styles['place-info-text']} >location:</p>
                    <p className={styles['place-info-location']} >{place.location}</p>

                    {route &&
                        <Link to={`/catalog/${place.routeId}`} className={styles['place-link-img']}>
                            {/* <img src={place.route?.imageUrl} alt={place.title} className={styles['place-info-img']} /> */}
                            <img src={route?.imageUrl} alt={place.title} className={styles['place-info-img']} />
                        </Link>
                    }
                </div>

                <div className={styles['place-img-container']} >
                    <img src={place.imageUrl} alt={place.title} className={styles['place-img-img']} />
                    {

                        (!isOwner && isAuthenticated) && (
                            <div className='like-buttons'>
                                {ifUserCanLike
                                    ? <button className="btn-like" onClick={onLikeClick} ><i className="fa-solid fa-thumbs-up"></i></button>
                                    : <button className="btn-like" onClick={onDislikeClick} ><i className="fa-solid fa-thumbs-down"></i></button>}
                            </div>
                        )

                    }
                </div>
            </div>
            {
                isOwner && (
                    <div className={styles['place-button-group']}>
                        <Link to={`/catalogPlace/${placeId}/edit`} className={styles['place-btn-edit']}>EDIT</Link>
                        <button onClick={() => onDeletePlaceClick(place._id)} className={styles['place-btn-delete']}  >DELETE</button>
                    </div>
                )
            }
        </>
    );
}