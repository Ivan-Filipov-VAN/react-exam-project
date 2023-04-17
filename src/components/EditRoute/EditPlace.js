import { useForm } from '../../hooks/useForm';
import { Link, useParams } from 'react-router-dom';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import * as placeService from '../../services/placeService';
import { useEffect, useContext } from 'react';

import { PlaceContext } from '../../contexts/PlaceContext';

export const EditPlace = () => {

    const { onPlaceEditSubmit } = useContext(PlaceContext);
    const { placeId } = useParams();


    const { values, changeHandler, onSubmit, changeValues } = useForm({
        _id: '',
        imageUrl: '',
        title: '',
        country: '',
        description: '',
        routeId: '',
        location: '',
    }, onPlaceEditSubmit);

    useEffect(() => {
        placeService.getOnePlace(placeId)
        .then(res => {
            changeValues(res);
        })
    }, [placeId]);

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

            <p>Rerurn to catalog <Link to={`/catalogPlace/${placeId}`}>HERE</Link> !</p>

            <Button variant="primary" type="submit">
                Create
            </Button>
        </Form>
    );


};