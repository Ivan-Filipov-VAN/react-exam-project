import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getOneRoute } from '../../services/routeService';



export const RouteDetailsPage = () => {

    const { routeId } = useParams();

    const [route, setRoute] = useState({});

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
        </>
    );
};