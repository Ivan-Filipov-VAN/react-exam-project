import { useContext } from 'react';

import { AuthContext } from '../../contexts/AuthContext'
import { useForm } from '../../hooks/useForm';

import { Link } from 'react-router-dom';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export const LoginPage = () => {

    const { onLoginSubmit } = useContext(AuthContext);

    const { values, changeHandler, onSubmit } = useForm({
        email: '',
        password: '',
    }
        , onLoginSubmit
    );

    return (
        <Form className='responsive-form' onSubmit={onSubmit}>
            <Form.Group className="mb-3" controlId="email">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                    type="email"
                    placeholder="Enter email"
                    name="email"
                    value={values.email}
                    onChange={changeHandler}
                />

                <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={values.password}
                    onChange={changeHandler}
                />
            </Form.Group>


            <p>If you are not registered yet, Please click <Link to={'/register'}>HERE</Link> !</p>

            <Button
                variant="primary"
                type="submit">
                Login
            </Button>
        </Form>
    );
};