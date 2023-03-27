import { useContext } from 'react';

import { RouteItem } from "./RouteItem"

import { AuthContext } from '../../contexts/AuthContext';


export const CatalogPage = () => {

    const { routes } = useContext(AuthContext);

    return (

        <>

            {routes.map(x => <RouteItem key={x._id} {...x} />)}

            {routes.length === 0 && <h3 className="no-articles">No articles yet</h3>}

            
        </>
    );
}