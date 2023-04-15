import { useContext } from "react";
import { RouteContext } from "../../contexts/RouteContext";

import { PlaceItem } from "./PlaceItem";

import styles from './CatalogPagePlace.module.css';

export const CatalogPagePlace = () => {

    const { pageRoutesPlaces, nextPlace, previousPlace, pagePlaces} = useContext(RouteContext);

    return (
        <section className={styles.catalog}>
            <h2 className={styles["catalog__title"]}>Most famous places</h2>
            <p className={styles["catalog__title-sub"]} >Recommended</p>
            <div className={styles.cards}>
                {pageRoutesPlaces.map(x => <PlaceItem key={x._id} {...x} />)}
            </div>
            {pageRoutesPlaces.length === 0 && <h3 className="no-articles">No articles yet</h3>}
            <button className="btn-pro" onClick={() => previousPlace(pagePlaces)}>Previous</button>
            <span className="btn-pro">Page: {pagePlaces + 1}</span>
            <button className="btn-pro" onClick={() => nextPlace(pagePlaces)}>Next</button>
        </section>
    );

}