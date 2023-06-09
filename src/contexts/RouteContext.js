import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as routeService from '../services/routeService';
import * as validation from '../utils/validation';

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

    const [searchQuerry, setSearchQuerry] = useState("");

    useEffect(() => {

        routeService.getAllRoutes()


            .then(resRoutes => setRoutes(resRoutes))
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
            setRandomRoutes(q);
        }, 5000);
        return () => {
            clearInterval(interval);
        };

    }, [routes]);


    useEffect(() => {
        routeService.getPageRoute(pageSize, page, searchQuerry)
            .then(result => {
                setPageRoutes(result);
            })
    }, [pageSize, page, searchQuerry]);

    const onRouteCreateSubmit = async (data) => {

        try {
            validation.ValidationCreareRoute(data);

            const newRoute = await routeService.createRoute(data);
            setRoutes(state => [...state, newRoute]);

            if (pageRoutes.length < DEFAULT_PAGE_SIZE) {
                setPageRoutes(state => [...state, newRoute]);
            }
            navigate('/catalog');
        } catch (err) {
            alert(err);
        }
    }

    const onRouteEditSubmit = async (data) => {

        try {
            validation.ValidationCreareRoute(data);

            const newRoute = await routeService.editRoute(data._id, data);
            setRoutes(state => state.map(x => x._id === data._id ? newRoute : x));
            setPageRoutes(state => state.map(x => x._id === data._id ? newRoute : x));
            setRandomRoutes(state => state.map(x => x._id === data._id ? newRoute : x));

            navigate('/catalog');
        } catch (err) {
            alert(err);
        }
    };

    const onDeleteRoute = (routeId) => {

        routeService.deleteRoute(routeId);
        setRoutes(state => state.filter(x => x._id !== routeId));

        setPageRoutes(state => state.filter(x => x._id !== routeId));

        navigate('/catalog');
    };

    const getRoute = (routeId) => {
        return routes.find(r => r._id === routeId);
    };

    const next = (page) => {
        if (page >= (Math.ceil(routes.length / pageSize) - 1)) {
            setPage(Math.ceil(routes.length / pageSize) - 1);
        } else {
            setPage(page + 1);
        }
    };

    const previous = (page) => {
        if (page <= 0) {
            setPage(0);
        } else {
            setPage(page - 1);
        }
    };

    const onSearchQuerry = (querry) => {
        const search = querry.querry.trim();
        if (searchQuerry !== search) {
            setPage(0);
            setSearchQuerry(search);
        }
    }

    const onResetCatalog = () => {
        setPage(0);
        setSearchQuerry('');
    }



    const context = {

        routes,
        getRoute,
        randomRoutes,

        onRouteCreateSubmit,
        onRouteEditSubmit,
        onDeleteRoute,

        pageRoutes,
        next,
        previous,
        page,
        onSearchQuerry,
        onResetCatalog,

    };

    return (
        <>
            <RouteContext.Provider value={context}>
                {children}
            </RouteContext.Provider>
        </>
    );

}