import styles from './RouteItem.module.css';

import { Link } from 'react-router-dom';
import { useContext } from 'react';

import { AuthContext } from '../../contexts/AuthContext';

export const RouteItem = (route) => {

    const { isAuthenticated } = useContext(AuthContext);

    return (

        <Link to={`/catalog/${route._id}`} className={styles.divNavigation}>
            <div className={styles.card}>
                    <img className={styles["card-img"]} src={route.imageUrl} alt={route.title}/>
                    <h3>{route.title}</h3>
                    <h4>{route.country}</h4>
                    <p>{route.description.length >= 10 ? route.description.slice(0,20) + '...' : route.description}</p>
                    {isAuthenticated && <Link to={'/'}> <i className="btn-like fa-regular fa-thumbs-up"></i></Link>}

                    
                    {/* <button className="btn card-btn">Discover place</button> */}
                </div>
        </Link>
    );


};