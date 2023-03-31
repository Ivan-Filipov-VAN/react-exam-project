import { useParams, Link } from "react-router-dom";
import { useForm } from "../../hooks/useForm";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { useEffect } from "react";
import { getLoggedInUser } from "../../services/userService";

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export const EditProfilePage = () => {

    const { onChangeUserDetails } = useContext(AuthContext);

    const { userId } = useParams();

    const { values, changeHandler, onSubmit, changeValues } = useForm({
        _id: '',
        email: '',
        firstName: '',
        lastName: '',
        imageUrl: '',
    }, onChangeUserDetails);

    useEffect(() => {
        getLoggedInUser(userId)
            .then(result => {
                changeValues(result)
            })
    }, [userId]);


    return (
        <Form className='responsive-form' onSubmit={onSubmit}>
            <h1>Edit Profile Details</h1>

            <Form.Group className="mb-3" controlId="email">
                <Form.Label>User Email : {values.email}</Form.Label>
            </Form.Group>


            <Form.Group className="mb-3" controlId="firstName">
                <Form.Label>First Name</Form.Label>
                <input className={values.firstName.length < 2 ? 'text-danger form-control' : 'form-control'}
                    type="text"
                    placeholder="Enter First Name"
                    name='firstName'
                    value={values.firstName}
                    onChange={changeHandler}
                />

                {values.firstName.length >= 2 ||
                    <Form.Text className="text-muted text-danger">
                        First Name must be more than 2 characters!.
                    </Form.Text>
                }

            </Form.Group>

            <Form.Group className="mb-3" controlId="lastName">
                <Form.Label>Last Name</Form.Label>
                <input className={values.lastName.length < 2 ? 'text-danger form-control' : 'form-control'}
                    type="text"
                    placeholder="Enter Last Name"
                    name='lastName'
                    value={values.lastName}
                    onChange={changeHandler}
                />

                {values.lastName.length >= 2 ||
                    <Form.Text className="text-muted text-danger">
                        Last Name must be more than 2 characters!.
                    </Form.Text>
                }

            </Form.Group>

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

            <p>Rerurn to catalog <Link to={'/catalog'}>HERE</Link> !</p>

            <Button variant="primary" type="submit">
                Edit
            </Button>
        </Form>
    );
};