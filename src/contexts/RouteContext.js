import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; 
import * as routeService from '../services/routeService';

export const RouteContext = createContext();

export const RouteProvider = ({
    children,
}) => {

    const navigate = useNavigate();

    const [routes, setRoutes] = useState([]);

    useEffect(() => {
        routeService.getAllRoutes()
            .then(result => {
                setRoutes(result);
            })
    }, []);

    const onRouteCreateSubmit = async (data) => {
        const newRoute = await routeService.createRoute(data);
        setRoutes(state => [...state, newRoute]);
        navigate('/catalog');
    }

    const onRouteEditSubmit = async (data) => {
        console.log(data);
        const newRoute = await routeService.editRoute(data._id, data);
        setRoutes(state => state.map(x => x._id === data._id ? newRoute : x));
        navigate('/catalog');
    };

    const onDeleteRoute = (routeId) => {
        routeService.deleteRoute(routeId);
        setRoutes(state => state.filter(x => x._id !== routeId));

        console.log(routes);
        navigate('/catalog');
    }


    const context = {
        routes,
        onRouteCreateSubmit,
        onRouteEditSubmit,
        onDeleteRoute,
    };

    return (
        <>
            <RouteContext.Provider value={context}>
                {children}
            </RouteContext.Provider>
        </>
    );

}