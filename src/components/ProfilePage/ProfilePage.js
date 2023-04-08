import styles from './ProfilePage.module.css';

import { useContext } from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { AuthContext } from '../../contexts/AuthContext'; 

export const ProfilePage = () => {

    const { onLoggedInUser} = useContext(AuthContext);

    const [user, setUser] = useState({});

    useEffect(() => {
        onLoggedInUser()
        .then(result => setUser(result))
    }, [onLoggedInUser]);

    return(
        <div className={styles['profile-container']}>
            <h2>Details Page</h2>
            <img className={styles['profile-img']} src={user.imageUrl} alt="UserImg" />
            <h3>{user.firstName}</h3>
            <h3>{user.lastName}</h3>
            <h3>{user.email}</h3>
            <Link to={`/profile/${user._id}/editProfile`} className="btn-pro">EDIT DETAILS</Link>
        </div>

    );
};