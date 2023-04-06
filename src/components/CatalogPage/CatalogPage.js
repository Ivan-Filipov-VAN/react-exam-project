import { RouteItem } from "./RouteItem"

import styles from './CatalogPage.module.css';

import { useContext } from "react";
import { RouteContext } from "../../contexts/RouteContext";


export const CatalogPage = () => {

    const { pageRoutes, previous, next, page } = useContext(RouteContext);


    return (
        <section className={styles.catalog}>
            <h2 className={styles["catalog__title"]}>Most famous places</h2>
            <p className={styles["catalog__title-sub"]} >Recommended</p>
            <div className={styles.cards}>
                {pageRoutes.map(x => <RouteItem key={x._id} {...x} />)}
            </div>
            {pageRoutes.length === 0 && <h3 className="no-articles">No articles yet</h3>}
            <button className="btn-pro" onClick={() => previous(page)}>Previous</button>
            <span className="btn-pro">Page: {page + 1}</span>
            <button className="btn-pro" onClick={() => next(page)}>Next</button>
        </section>
    );
}