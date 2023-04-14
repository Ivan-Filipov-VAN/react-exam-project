import { Link } from 'react-router-dom';

import styles from './PlaceCard.module.css';

export const PlaceCard = (place) => {
    return (
        <Link to={`/catalogPlace/${place._id}`}>
            <div className={styles['place-card']}>
                <img className={styles['place-img']} src={place.imageUrl} alt={place.title} />
                <p className={styles['place-title']} >{place.title}</p>
            </div>
        </Link>
    );
}