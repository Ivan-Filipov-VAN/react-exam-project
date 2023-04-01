import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useForm } from "../../hooks/useForm";
import { getOneRoute } from "../../services/routeService";

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { NavigationSec } from "../Navigation/NavigationSec";

export const EditRoute = ({
    onRouteEditSubmit,
}) => {

    const { routeId } = useParams();

    const { values, changeHandler, onSubmit, changeValues } = useForm({
        _id: '',
        imageUrl: '',
        title: '',
        country: '',
        description: '',
    }, onRouteEditSubmit);

    useEffect(() => {
        getOneRoute(routeId)
            .then(result => {
                changeValues(result);
            })
    }, [routeId]);


    return (
        <Form className='responsive-form' onSubmit={onSubmit}>
            <h1>Edit Place</h1>
            <Form.Group className="mb-3" controlId="imageUrl">
                <Form.Label>Image Url</Form.Label>
                <input className={values.imageUrl.length < 3 ? 'text-danger form-control' : 'form-control'}
                    type="text"
                    placeholder="Enter imageUrl"
                    name='imageUrl'
                    value={values.imageUrl}
                    onChange={changeHandler}
                />
                {values.imageUrl.length >= 3 ||
                    <Form.Text className="text-muted text-danger">
                        ImageUrl must be more than 3 characters!.
                    </Form.Text>
                }
            </Form.Group>

            <Form.Group className="mb-3" controlId="title">
                <Form.Label>Title</Form.Label>
                <input className={values.title.length < 3 ? 'text-danger form-control' : 'form-control'}
                    type="text"
                    placeholder="title"
                    name='title'
                    value={values.title}
                    onChange={changeHandler}
                />

                {values.title.length >= 3 ||
                    <Form.Text className="text-muted text-danger">
                        Title must be more than 3 characters!.
                    </Form.Text>
                }

            </Form.Group>

            <Form.Group className="mb-3" controlId="country">
                <Form.Label>Country</Form.Label>
                <input className={values.country.length < 3 ? 'text-danger form-control' : 'form-control'}
                    type="text"
                    placeholder="country"
                    name='country'
                    value={values.country}
                    onChange={changeHandler}
                />

                {values.country.length >= 3 ||
                    <Form.Text className="text-muted text-danger">
                        Country must be more than 3 characters!.
                    </Form.Text>
                }

            </Form.Group>

            <Form.Group className="mb-3" controlId="description">
                {/* <Form.Group className={values.confirmPassword.length < 3 ? 'text-danger mb-3' : 'mb-3'}  controlId="confirmPassword"> */}
                <Form.Label>Description</Form.Label>
                <input className={values.description.length < 5 ? 'text-danger form-control' : 'form-control'}
                    type="text"
                    placeholder="description"
                    name='description'
                    value={values.description}
                    onChange={changeHandler}
                />

                {values.description.length >= 5 ||
                    <Form.Text className="text-muted text-danger">
                        Description must be more than 5 characters!.
                    </Form.Text>
                }

            </Form.Group>

            <p>Rerurn to catalog <Link to={'/catalog'}>HERE</Link> !</p>

            <Button variant="primary" type="submit">
                Edit
            </Button>
        </Form>
    );

};