import styles from './PlaceDetailsPage.module.css';
import { Link, useParams } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';

import { AuthContext } from '../../contexts/AuthContext';
import { RouteContext } from '../../contexts/RouteContext';

import * as placeService from '../../services/placeService';

export const PlaceDetailsPage = () => {

    const { placeId } = useParams();

    const [place, setPlace] = useState({});

    const { userId } = useContext(AuthContext);
    const { onDeletePlace } = useContext(RouteContext);

    useEffect(() => {
        placeService.getPlaceByIdWithOwner(placeId)
            .then(res => {
                console.log(res)
                setPlace(res)
            })
    }, [placeId]);

    const isOwner = userId === place._ownerId;

    const onDeletePlaceClick = (placeId) => {
        console.log(placeId);

        onDeletePlace(placeId);

    };

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
                    <p className={styles['place-info-text']} >location:</p>
                    <p className={styles['place-info-location']} >{place.location}</p>
                    <Link to={`/catalog/${place.routeId}`} className={styles['place-link-img']}>
                        <img src={place.route?.imageUrl} alt={place.title} className={styles['place-info-img']} />
                    </Link>
                </div>

                <div className={styles['place-img-container']} >
                    <img src={place.imageUrl} alt={place.title} className={styles['place-img-img']} />
                </div>
            </div>
            {
                isOwner && (
                    <div className={styles['place-button-group']}>
                        <Link to={'/catalog'} className={styles['place-btn-edit']}>EDIT</Link>
                        <button onClick={() => onDeletePlaceClick(place._id)} className={styles['place-btn-delete']}  >DELETE</button>
                    </div>
                    )
            }
        </>
    );
}