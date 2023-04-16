import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as routeService from '../services/routeService';
import * as placeService from '../services/placeService';
import * as validation from '../utils/validation';

export const RouteContext = createContext();

export const RouteProvider = ({
    children,
}) => {

    const DEFAULT_PAGE_SIZE = 6;
    const DEFAULT_PAGE_SIZE_PLACES = 12;

    const navigate = useNavigate();

    const [routes, setRoutes] = useState([]);
    const [randomRoutes, setRandomRoutes] = useState([]);
    const [pageRoutes, setPageRoutes] = useState([]);
    const [page, setPage] = useState(0);
    const [pageSize] = useState(DEFAULT_PAGE_SIZE);

    const [ searchQuerry, setSearchQuerry ] = useState("");

    const [ places, setPlaces ] = useState([]);
    const [randomPlaces, setRandomPlaces] = useState([]);
    const [pageRoutesPlaces, setPageRoutesPlaces] = useState([]);
    const [pagePlaces, setPagePlaces] = useState(0);
    const [pageSizePlaces] = useState(DEFAULT_PAGE_SIZE_PLACES);

    useEffect(() => {
        Promise.all([
            routeService.getAllRoutes(),
            placeService.getAllPlaces(),
        ])
        .then(([resRoutes, resPlaces]) => {
            setRoutes(resRoutes);
            setPlaces(resPlaces);
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

            setRandomRoutes(q);

            let w = [];
            let temp2 = [...places]
            if (temp2.length > 0) {
                let ind = Math.floor(Math.random() * temp2.length);
                w.push(temp2[ind]);
                temp2.splice(ind, 1);
            }
            if (temp2.length > 0) {
                let ind = Math.floor(Math.random() * temp2.length);
                w.push(temp2[ind]);
                temp2.splice(ind, 1);
            }
            if (temp2.length > 0) {
                let ind = Math.floor(Math.random() * temp2.length);
                w.push(temp2[ind]);
                temp2.splice(ind, 1);
            }

            setRandomPlaces(w);


        }, 5000);
        return () => {
            clearInterval(interval);
        };

    }, [routes, places]);


    useEffect(() => {
        routeService.getPageRoute(pageSize, page, searchQuerry)
            .then(result => {
                setPageRoutes(result);
            })
    }, [pageSize, page, searchQuerry]);


    // useEffect(() => {
    //     routeService.getPageRoute(pageSize, page, )
    //         .then(result => {
    //             setPageRoutes(result);
    //         })
    // }, [pageSize, page]);

    useEffect(() => {
        placeService.getPagePlace(pageSizePlaces, pagePlaces)
            .then(result => {
                setPageRoutesPlaces(result);
            })
    }, [pageSizePlaces, pagePlaces]);

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

        navigate('/catalog');
    }

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
        if (searchQuerry !== search ) {
            setPage(0);
            setSearchQuerry(search);
        } 
    }

    const onResetCatalog = () => {
        setPage(0);
        setSearchQuerry('');
    }

    const getRoute = (routeId) => {
        console.log(routes);
        return routes.find(r => r._id === routeId);
        
    };

    const setMainPlaces = (place) => {
        setPlaces(state => [place, ...state]);

        if (pageRoutesPlaces.length < DEFAULT_PAGE_SIZE_PLACES) {
            setPageRoutesPlaces(state => [...state, place]);
        }
    }

    const getPlaceById = (placeId) => {
        return places.find(p => p._id === placeId);
    }

    // const getAllPlacesById = (routeId) => {
    //     const placesById = places.filter(p => p.routeId === routeId);
    //     console.log(placesById)
    //     return placesById;
    // }

    // const onPlaceCreateSubmit = async (data) =>  {
    //     try {validation.ValidationCreareRoute(data);
            

    //         const newRoute = await placeService.createPlace(data);
    //         setPlaces(state => [...state, newRoute]);

    //         if (pageRoutesPlaces.length < DEFAULT_PAGE_SIZE_PLACES) {
    //             setPageRoutesPlaces(state => [...state, newRoute]);
    //         }

    //         navigate(`/catalog/${data.routeId}`);
    //     } catch (err) {
    //         alert(err);
    //     }
    // };

    const onPlaceEditSubmit = async (data) => {
        const newPlace = await placeService.editPlace(data._id, data);
        setPlaces(state => state.map(x => x._id === data._id ? newPlace : x));
        setPageRoutesPlaces(state => state.map(x => x._id === data._id ? newPlace : x));
        setRandomPlaces(state => state.map(x => x._id === data._id ? newPlace : x));
        navigate(`/catalogPlace/${data._id}`);
    };

    const onDeletePlace = (placeId) => {

        placeService.deletePlace(placeId);
        setPlaces(state => state.filter(p => p._id !== placeId));
        setPageRoutesPlaces(state => state.filter(x => x._id !== placeId));

        navigate('/catalogPlace');
    };

    const nextPlace = (page) => {
        if (page >= (Math.ceil(places.length / pageSizePlaces) - 1)) {
            setPagePlaces(Math.ceil(places.length / pageSizePlaces) - 1);
        } else {
            setPagePlaces(page + 1);
        }
    };

    const previousPlace = (page) => {
        if (page <= 0) {
            setPagePlaces(0);
        } else {
            setPagePlaces(page - 1);
        }
    };

    const context = {

        // getAllPlacesById,
        onDeletePlace,

        routes,
        getRoute,
        randomRoutes,
        
        onRouteCreateSubmit,
        onRouteEditSubmit,
        onDeleteRoute,

        randomPlaces,
        setMainPlaces,
        getPlaceById,
        // onPlaceCreateSubmit,
        onPlaceEditSubmit,

        pageRoutes,
        next,
        previous,
        page,
        onSearchQuerry,
        onResetCatalog,

        pageRoutesPlaces,
        nextPlace,
        previousPlace,
        pagePlaces,
    };

    return (
        <>
            <RouteContext.Provider value={context}>
                {children}
            </RouteContext.Provider>
        </>
    );

}