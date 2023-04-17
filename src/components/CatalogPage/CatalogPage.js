import { RouteItem } from "./RouteItem"

import styles from './CatalogPage.module.css';

import { useContext } from "react";
import { RouteContext } from "../../contexts/RouteContext";

import { useForm } from '../../hooks/useForm';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


export const CatalogPage = () => {

    const { pageRoutes, previous, next, page, onSearchQuerry, onResetCatalog } = useContext(RouteContext);


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
                {pageRoutes.map(x => <RouteItem key={x._id} {...x} />)}
            </div>
            {pageRoutes.length === 0 && <h3 className="no-articles">No articles yet</h3>}
            <button className="btn-pro" onClick={() => previous(page)}>Previous</button>
            <span className="btn-pro">Page: {page + 1}</span>
            <button className="btn-pro" onClick={() => next(page)}>Next</button>
        </section>
    );
}