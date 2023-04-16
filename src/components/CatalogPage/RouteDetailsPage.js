import { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';

import { AuthContext } from '../../contexts/AuthContext';
import { RouteContext } from '../../contexts/RouteContext';
import { Addcomment } from '../Comments/AddComment';

import * as routeService from '../../services/routeService';
import * as commentService from '../../services/commentService';
import * as likeService from '../../services/likeService';
import * as placeService from '../../services/placeService';
import * as validation from '../../utils/validation';

import { CommentCard } from '../Comments/CommentCard';

import styles from './Details.module.css';
import { PlaceCard } from './PlaceCard';
import { CreatePlaceModal } from '../CreatePage/CreatePlaceModal';

export const RouteDetailsPage = () => {

    const { routeId } = useParams();

    const [route, setRoute] = useState({});
    const [places, setPlaces] = useState([]);

    const [likes, setLikes] = useState(0);
    const [canLike, setCalLike] = useState(0);

    const { userId, userEmail, userImageUrl, isAuthenticated } = useContext(AuthContext);
    const { onDeleteRoute, setMainPlaces, getAllPlacesById } = useContext(RouteContext);

    const [showAddComment, setShowAddComment] = useState(false);
    const [showAddPlace, setShowAddPlace] = useState(false);

    useEffect(() => {
        Promise.all([
            routeService.getOneRoute(routeId),
            commentService.getAllComments(routeId),
            placeService.getAllPlacesInRoute(routeId),
            // getAllPlacesById(routeId)
        ])
            .then(([routeData
                , comments
                , routePlaces
            ]) => {
                setRoute({
                    ...routeData,
                    comments,
                })

                setPlaces(routePlaces)
                
            })

        // getOneRoute(routeId)
        //     .then(result => {
        //         setRoute(result);
        //     })
    }, [routeId]);

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

    const isOwner = userId === route._ownerId;

    const onAddComment = async (data) => {
        const response = await commentService.createComment(routeId, data.comment);
        setShowAddComment(false);

        setRoute(state => ({
            ...state,
            comments: [
                {
                    ...response,
                    author: {
                        //todo
                        _id: userId,
                        email: userEmail,
                        imageUrl: userImageUrl,
                    }
                },
                ...state.comments
            ]
        }));
    };

    const onAddPlace = async (data) => {
        try {
            validation.ValidationCreareRoute(data);

            const newRoute = await placeService.createPlace(data);
            setPlaces(state => [newRoute, ...state]);
            setMainPlaces(newRoute);

            setShowAddPlace(false);

        } catch (err) {
            alert(err.message);
        }
    };

    const onCommentAddClick = () => {
        setShowAddComment(true);
    }

    const onPlaceAddClick = () => {
        setShowAddPlace(true);
    }

    const onClose = () => {
        setShowAddComment(false);
        setShowAddPlace(false);

    }

    const onLikeClick = () => {
        likeService.onLikeSubmit(route._id);
        setLikes(likes + 1);
    }

    const onDislikeClick = () => {
        likeService.onDislikeSubmit(route._id, userId);
        setLikes(likes - 1);
    }

    const ifUserCanLike = canLike === 0 && route._ownerId !== userId;

    return (
        <>
            <h1 className={styles['details-head']}>DETAILS PAGE</h1>
            <div className={styles['details-container']}>
                {showAddComment && <Addcomment show={showAddComment} onClose={onClose} onAddComment={onAddComment} />}
                {showAddPlace && <CreatePlaceModal show={showAddPlace} onClose={onClose} onAddPlace={onAddPlace} routeId={routeId} />}

                <img className={styles['details-img']} src={route.imageUrl} alt={route.title} />
                <div className={styles.details}>

                    <p className={styles['details-title']}>{route.title}</p>
                    <p className={styles['details-desc']}>Country: {route.country}</p>
                    <p className={styles['details-desc']}>Likes: {likes}</p>
                    <p className={styles['details-desc']}>{route.description}</p>
                    {/* <p>{route._ownerId}</p> */}


                    {
                        isOwner && (
                            <div className='buttons'>
                                <Link to={`/catalog/${route._id}/edit`} className="btn-pro">Edit</Link>
                                <button onClick={() => onDeleteRoute(route._id)} className="btn-pro">Delete</button>
                            </div>
                        )
                    }

                    {

                        (!isOwner && isAuthenticated) && (
                            <div className='buttons'>
                                <button className="btn-pro" onClick={onCommentAddClick} >Comment</button>
                                {ifUserCanLike
                                    ? <button className="btn-pro" onClick={onLikeClick} >Like</button>
                                    : <button className="btn-pro" onClick={onDislikeClick} >Dislike</button>}
                            </div>
                        )

                    }

                    {
                        isAuthenticated && (
                            <div className='buttons'>
                                <button className="btn-pro" onClick={onPlaceAddClick} >Add Place</button>
                            </div>
                        )
                    }



                </div>
            </div >

            {!places?.length ? <h2 className={styles.comments}>No Places !</h2> : <h2 className={styles.comments}>Places near {route.title} :</h2>}

            <div className={styles['places-cards']}>

                {
                    places.map(x => <PlaceCard key={x._id} {...x} />)
                }
            </div>


            {!route.comments?.length ? <h2 className={styles.comments}>No Comments !</h2> : <h2 className={styles.comments}>Comments:</h2>}

            {route.comments && <>
                {/* <h2 className={styles.comments}>Comments:</h2> */}
                <div className={styles['comments-cards']}>

                    {
                        route.comments.map(x => <CommentCard key={x._id} {...x} />)
                    }
                </div>
            </>
            }
        </>
    );
};