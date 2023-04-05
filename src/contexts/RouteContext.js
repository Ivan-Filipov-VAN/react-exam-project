import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as routeService from '../services/routeService';

export const RouteContext = createContext();

export const RouteProvider = ({
    children,
}) => {

    const navigate = useNavigate();

    const [routes, setRoutes] = useState([]);
    const [randomRoutes, setRandomRoutes] = useState([]);

    useEffect(() => {
        routeService.getAllRoutes()
            .then(result => {
                console.log('do')
                setRoutes(result);
                setRandomRoutes(result.slice(0, 3));
            })

        const interval = setInterval(() => {


            let q = [];
            let temp = [...routes]
            if (temp.length > 0) {
                let ind = Math.floor(Math.random() * temp.length);
                q.push(temp[ind]);
                temp.splice(ind, 1);
            }
            if (temp.length > 0) {
                let ind = Math.floor(Math.random() * temp.length);
                q.push(temp[ind]);
                temp.splice(ind, 1);
            }
            if (temp.length > 0) {
                let ind = Math.floor(Math.random() * temp.length);
                q.push(temp[ind]);
                temp.splice(ind, 1);
            }

            console.log(q);
            setRandomRoutes(q);


        }, 5000);
        return () => {
            clearInterval(interval);
        };

    }, []);

    


    // useEffect(() => {
    //     const interval = setInterval(() => {
    //         // setRandomRoutes(Date.now())
    //     }, 1000);
    //     return () => {
    //         clearInterval(interval);
    //     };
    // }, []);


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
        randomRoutes,
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