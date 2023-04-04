import { useContext } from 'react';

import { useForm } from '../../hooks/useForm';
import { AuthContext } from '../../contexts/AuthContext';

import { Link } from 'react-router-dom';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export const RegisterPage = () => {

    const { onRegisterSubmit } = useContext(AuthContext);

    const { values, changeHandler, onSubmit } = useForm({
        email: '',
        imageUrl: '',
        password: '',
        confirmPassword: '',
    }, onRegisterSubmit);

    return (
        <Form className='responsive-form' onSubmit={onSubmit}>

            <Form.Group className="mb-3" controlId="email">
                <Form.Label>Email address</Form.Label>
                <input className={values.email.length < 5 ? 'text-danger form-control' : 'form-control'}
                    type="email"
                    placeholder="Enter email"
                    name='email'
                    value={values.email}
                    onChange={changeHandler}
                />
                {values.email.length >= 5 ||
                    <Form.Text className="text-muted text-danger">
                        Email must be more than 5 characters!.
                    </Form.Text>
                }
            </Form.Group>

            <Form.Group className="mb-3" controlId="imageUrl">
                <Form.Label>Image URL</Form.Label>
                <input className={values.imageUrl.length < 5 ? 'text-danger form-control' : 'form-control'}
                    type="text"
                    placeholder="Enter Image URL"
                    name='imageUrl'
                    value={values.imageUrl}
                    onChange={changeHandler}
                />
                {values.imageUrl.length >= 5 ||
                    <Form.Text className="text-muted text-danger">
                        ImageUrl must be more than 5 characters!.
                    </Form.Text>
                }
            </Form.Group>

            <Form.Group className="mb-3" controlId="password">
                <Form.Label>Password</Form.Label>
                <input className={values.password.length < 5 ? 'text-danger form-control' : 'form-control'}
                    type="password"
                    placeholder="Password"
                    name='password'
                    value={values.password}
                    onChange={changeHandler}
                />

                {values.password.length >= 5 ||
                    <Form.Text className="text-muted text-danger">
                        Password must be more than 5 characters!.
                    </Form.Text>
                }

            </Form.Group>

            <Form.Group className="mb-3" controlId="confirmPassword">
                {/* <Form.Group className={values.confirmPassword.length < 3 ? 'text-danger mb-3' : 'mb-3'}  controlId="confirmPassword"> */}
                <Form.Label>Confirm Password</Form.Label>
                <input className={values.confirmPassword.length < 5 ? 'text-danger form-control' : 'form-control'}
                    type="password"
                    placeholder="Confirm Password"
                    name='confirmPassword'
                    value={values.confirmPassword}
                    onChange={changeHandler}
                />

                {values.confirmPassword.length >= 5 ||
                    <Form.Text className="text-muted text-danger">
                        Confirm Password must be more than 5 characters!.
                    </Form.Text>
                }

            </Form.Group>

            <p>If you are already registered, Please click <Link to={'/login'}>HERE</Link> !</p>

            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    );
};