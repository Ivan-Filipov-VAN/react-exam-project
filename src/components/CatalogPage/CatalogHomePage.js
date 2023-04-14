import { RouteItem } from "./RouteItem"

import styles from './CatalogPage.module.css';

import { useContext } from "react";
import { RouteContext } from "../../contexts/RouteContext";


export const CatalogHomePage = () => {

    const { randomRoutes, randomPlaces } = useContext(RouteContext);


    return (
        <>
            <section className={styles.catalog}>
                <h2 className={styles["catalog__title"]}>Proposal for new experience</h2>
                <p className={styles["catalog__title-sub"]} >Recommended</p>
                <div className={styles.cards}>
                    {randomRoutes.map(x => <RouteItem key={x._id} {...x} />)}
                </div>
                {randomRoutes.length === 0 && <h3 className="no-articles">No articles yet</h3>}
            </section>
            <section className={styles.catalog}>
                <h2 className={styles["catalog__title"]}>Proposal for new experience</h2>
                <p className={styles["catalog__title-sub"]} >Recommended</p>
                <div className={styles.cards}>
                    {randomPlaces.map(x => <RouteItem key={x._id} {...x} />)}
                </div>
                {randomPlaces.length === 0 && <h3 className="no-articles">No articles yet</h3>}
            </section>
        </>
    );
}