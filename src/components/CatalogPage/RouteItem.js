import styles from './RouteItem.module.css';

import { Link } from 'react-router-dom';
// import { useContext } from 'react';

// import { AuthContext } from '../../contexts/AuthContext';

export const RouteItem = (route) => {

    // const { userId } = useContext(AuthContext);

    return (

        <Link to={`/catalog/${route._id}`} className={styles.divNavigation}>
            <div className={styles.card}>
                    <img className={styles["card-img"]} src={route.imageUrl} alt={route.title}/>
                    <h3>{route.title}</h3>
                    <h4>{route.country}</h4>
                    <p>{route.description}</p>
                    {/* <button className="btn card-btn">Discover place</button> */}
                </div>
        </Link>
    );


};