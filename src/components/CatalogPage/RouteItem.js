import styles from './RouteItem.module.css';

import { Link } from 'react-router-dom';
import { useContext } from 'react';

import { AuthContext } from '../../contexts/AuthContext';

export const RouteItem = (route) => {

    const { userId } = useContext(AuthContext);

    return (

        <Link to={`/catalog/${route._id}`} className={styles.divNavigation}>
            <div className={styles.routeItem}>
                <h1>{route.title}</h1>
                <h4>{route.imageUrl}</h4>
                <h3>{route.description}</h3>
                {userId === route._ownerId && <button>IS OWNER</button>}

                {/* <Link to={`/catalog/${route._id}`} className="btn btn-secondary">Details</Link> */}
            </div>
        </Link>
    );


};