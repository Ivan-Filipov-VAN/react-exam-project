import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getOneRoute } from '../../services/routeService';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';

export const RouteDetailsPage = ({
    onDeleteRoute,
}) => {

    const { routeId } = useParams();
    const [route, setRoute] = useState({});
    const { userId } = useContext(AuthContext);

    useEffect(() => {
        getOneRoute (routeId)
        .then(result => {
            setRoute(result);
        })
    }, [routeId]);

    return (
        <>
            <h2>DETAILS PAGE</h2>
            <h4>{route.title}</h4>
            <h4>{route.description}</h4>
            <h4>{route.imageUrl}</h4>
            <h4>{route._ownerId}</h4>
            {userId === route._ownerId && <Link to={`/catalog/${route._id}/edit`}>Edit</Link>}
            {userId === route._ownerId && <button onClick={() => onDeleteRoute(route._id)}>Delete</button>}
        </>
    );
};