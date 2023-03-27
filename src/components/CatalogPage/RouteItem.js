import { useContext } from 'react';

import { AuthContext } from '../../contexts/AuthContext';

export const RouteItem = (route) => {

    const { userId } = useContext(AuthContext);

    return (
        <>
            <h1>{route.title}</h1>
            <h4>{route.imageUrl}</h4>
            <h3>{route.description}</h3>
            {userId === route._ownerId && <button>IS OWNER</button>}
        </>

    );


};