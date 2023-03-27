import { useContext } from 'react';
import { useState, useEffect } from 'react';

import { AuthContext } from '../../contexts/AuthContext'; 

export const ProfilePage = () => {

    const { onLoggedInUser, token } = useContext(AuthContext);

    const [user, setUser] = useState({});

    useEffect(() => {
        onLoggedInUser(token)
        .then(result => setUser(result))
    }, [onLoggedInUser, token]);


    return(
        <>
            <h2>Details Page</h2>
            <h3>{user.email}</h3>
            <h3>{user.password}</h3>
            <img src={user.imageUrl} alt="UserImg" />

        </>

    );
};