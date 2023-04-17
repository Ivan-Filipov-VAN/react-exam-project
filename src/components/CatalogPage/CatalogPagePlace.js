import { useContext } from "react";
import { PlaceContext } from "../../contexts/PlaceContext";

import { PlaceItem } from "./PlaceItem";

import styles from './CatalogPagePlace.module.css';
import { useForm } from "../../hooks/useForm";

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export const CatalogPagePlace = () => {

    const { pageRoutesPlaces, nextPlace, previousPlace, pagePlaces, onSearchQuerry, onResetCatalog } = useContext(PlaceContext);

    const { values, changeHandler, onSubmit, changeValues } = useForm({
        querry: '',
    }, onSearchQuerry);

    const onResetCatalogClick = () => {
        changeValues({
            querry: '',
        });
        onResetCatalog();
    }

    return (
        <section className={styles.catalog}>


            <Form className='responsive-form' onSubmit={onSubmit}>
                <Form.Group className="mb-3" controlId="querry">
                    <Form.Label>Search by Courntry:</Form.Label>
                    <input className='form-control'
                        type="text"
                        placeholder="Search"
                        name='querry'
                        value={values.querry}
                        onChange={changeHandler}
                    />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Search
                </Button>
                <Button variant="primary" type="btn" onClick={onResetCatalogClick}>
                    Show All
                </Button>
            </Form>


            <h2 className={styles["catalog__title"]}>Most famous places</h2>
            <p className={styles["catalog__title-sub"]} >Recommended</p>
            <div className={styles.cards}>
                {pageRoutesPlaces?.map(x => <PlaceItem key={x._id} {...x} />)}
            </div>
            {pageRoutesPlaces?.length === 0 && <h3 className="no-articles">No articles yet</h3>}
            <button className="btn-pro" onClick={() => previousPlace(pagePlaces)}>Previous</button>
            <span className="btn-pro">Page: {pagePlaces + 1}</span>
            <button className="btn-pro" onClick={() => nextPlace(pagePlaces)}>Next</button>
        </section>
    );

}