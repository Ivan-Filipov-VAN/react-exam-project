
import { useForm } from '../../hooks/useForm';

import { Link, useParams } from 'react-router-dom';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


import * as routeService from '../../services/routeService';
import { useEffect, useContext } from 'react';

import { RouteContext } from '../../contexts/RouteContext';

export const CreatePlace = () => {

    const { routeId } = useParams();
    const { onPlaceCreateSubmit } = useContext(RouteContext);


    const { values, changeHandler, onSubmit, changeValues } = useForm({
        imageUrl: '',
        title: '',
        country: '',
        description: '',
        routeId: '',
        location: '',
    }, onPlaceCreateSubmit);

    useEffect(() => {
        routeService.getOneRoute(routeId)
        .then(res => {
            const newValue = {
                imageUrl: '',
                title: '',
                country: res.country,
                description: '',
                routeId: res._id,
                location: res.title,
            }
            changeValues(newValue);
        })
    }, [routeId]);

    return (
        <Form className='responsive-form' onSubmit={onSubmit}>
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

            <Form.Group className="mb-3" controlId="description">
                <Form.Label>Description</Form.Label>
                <input className={values.description.length < 3 ? 'text-danger form-control' : 'form-control'}
                    type="text"
                    placeholder="description"
                    name='description'
                    value={values.description}
                    onChange={changeHandler}
                />

                {values.description.length >= 3 ||
                    <Form.Text className="text-muted text-danger">
                        Description must be more than 3 characters!.
                    </Form.Text>
                }

            </Form.Group>

            <p>Rerurn to catalog <Link to={'/catalog'}>HERE</Link> !</p>

            <Button variant="primary" type="submit">
                Create
            </Button>
        </Form>
    );


};