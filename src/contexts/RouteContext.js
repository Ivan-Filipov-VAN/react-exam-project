import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as routeService from '../services/routeService';

export const RouteContext = createContext();

export const RouteProvider = ({
    children,
}) => {

    const DEFAULT_PAGE_SIZE = 6;

    const navigate = useNavigate();

    const [routes, setRoutes] = useState([]);
    const [randomRoutes, setRandomRoutes] = useState([]);
    const [pageRoutes, setPageRoutes] = useState([]);
    const [page, setPage] = useState(0);
    const [pageSize] = useState(DEFAULT_PAGE_SIZE);

    useEffect(() => {

        routeService.getAllRoutes()
            .then(result => {
                console.log('do')
                setRoutes(result);
                setRandomRoutes(result.slice(0, 3));
            })
        }, []);
        useEffect(() => {

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

    }, [routes]);

    useEffect(() => {
        routeService.getPageRoute(pageSize, page)
            .then(result => {
                console.log('do')
                setPageRoutes(result);
            })
        }, [pageSize, page]);


    const onRouteCreateSubmit = async (data) => {
        const newRoute = await routeService.createRoute(data);
        setRoutes(state => [...state, newRoute]);

        if (pageRoutes.length < DEFAULT_PAGE_SIZE) {
            setPageRoutes(state => [...state, newRoute]);
        }
        navigate('/catalog');
    }

    const onRouteEditSubmit = async (data) => {
        console.log(data);
        const newRoute = await routeService.editRoute(data._id, data);
        setRoutes(state => state.map(x => x._id === data._id ? newRoute : x));
        setPageRoutes(state => state.map(x => x._id === data._id ? newRoute : x));
        setRandomRoutes(state => state.map(x => x._id === data._id ? newRoute : x));
        
        navigate('/catalog');
    };

    const onDeleteRoute = (routeId) => {
        routeService.deleteRoute(routeId);
        setRoutes(state => state.filter(x => x._id !== routeId));

        setPageRoutes(state => state.filter(x => x._id !== routeId));

        console.log(routes);
        navigate('/catalog');
    }

    const next = (page) => {
        console.log(page);
        
        if (page >= (Math.ceil(routes.length / pageSize) - 1)) {
            setPage(Math.ceil(routes.length / pageSize) - 1);
        } else {

            setPage(page + 1);
        }
    };

    const previous = (page) => {
        console.log(page);
        if (page <= 0) {
            setPage(0);
        } else {

            setPage(page - 1);
        }
    };


    const context = {
        pageRoutes,
        routes,
        randomRoutes,
        onRouteCreateSubmit,
        onRouteEditSubmit,
        onDeleteRoute,

        next,
        previous,
        page,
    };

    return (
        <>
            <RouteContext.Provider value={context}>
                {children}
            </RouteContext.Provider>
        </>
    );

}