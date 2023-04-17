import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as placeService from '../services/placeService';
import * as validation from '../utils/validation';

export const PlaceContext = createContext();

export const PlaceProvider = ({
    children,
}) => {

    const DEFAULT_PAGE_SIZE_PLACES = 12;

    const navigate = useNavigate();

    const [places, setPlaces] = useState([]);
    const [randomPlaces, setRandomPlaces] = useState([]);
    const [pageRoutesPlaces, setPageRoutesPlaces] = useState([]);
    const [pagePlaces, setPagePlaces] = useState(0);
    const [pageSizePlaces] = useState(DEFAULT_PAGE_SIZE_PLACES);

    const [searchQuerry, setSearchQuerry] = useState("");

    useEffect(() => {
        placeService.getAllPlaces()
            .then(resPlaces => setPlaces(resPlaces))
    }, []);


    useEffect(() => {

        const interval = setInterval(() => {
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

    }, [places]);

    useEffect(() => {
        placeService.getPagePlace(pageSizePlaces, pagePlaces, searchQuerry)
            .then(result => {
                setPageRoutesPlaces(result);
            })
    }, [pageSizePlaces, pagePlaces, searchQuerry]);



    const setMainPlaces = (place) => {
        setPlaces(state => [place, ...state]);

        if (pageRoutesPlaces.length < DEFAULT_PAGE_SIZE_PLACES) {
            setPageRoutesPlaces(state => [...state, place]);
        }
    }

    const getPlaceById = (placeId) => {
        return places.find(p => p._id === placeId);
    }


    const onPlaceEditSubmit = async (data) => {

        try {
            validation.ValidationCreareRoute(data);

            const newPlace = await placeService.editPlace(data._id, data);
            setPlaces(state => state.map(x => x._id === data._id ? newPlace : x));
            setPageRoutesPlaces(state => state.map(x => x._id === data._id ? newPlace : x));
            setRandomPlaces(state => state.map(x => x._id === data._id ? newPlace : x));
            navigate(`/catalogPlace/${data._id}`);
        } catch (err) {
            alert(err.message);
        }
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

    const onSearchQuerry = (querry) => {
        const search = querry.querry.trim();
        if (searchQuerry !== search) {
            setPagePlaces(0);
            setSearchQuerry(search);
        }
    }

    const onResetCatalog = () => {
        setPagePlaces(0);
        setSearchQuerry('');
    }

    const context = {

        randomPlaces,
        setMainPlaces,
        getPlaceById,
        onPlaceEditSubmit,
        onDeletePlace,

        pageRoutesPlaces,
        nextPlace,
        previousPlace,
        pagePlaces,
        onSearchQuerry,
        onResetCatalog,
    };

    return (
        <>
            <PlaceContext.Provider value={context}>
                {children}
            </PlaceContext.Provider>
        </>
    );

}