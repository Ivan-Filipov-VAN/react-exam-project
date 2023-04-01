import { useContext } from 'react';

import { Link } from 'react-router-dom';

import { AuthContext } from '../../contexts/AuthContext';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

export const NavigationSec = () => {

    const { isAuthenticated, userEmail } = useContext(AuthContext);

    return (
        <Navbar bg="light" expand="lg">
            <Container className='nav-container'>
                {/* <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand> */}
                <Link to={'/'} className='navbar-brand'>Home</Link>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">

                        <Nav>
                            <Link className='nav-link' to={'/catalog'}>
                                Catalog
                            </Link>
                        </Nav>

                        {!isAuthenticated && <>



                            <Nav>
                                <Link className='nav-link' to={'/login'}>
                                    Login
                                </Link>
                            </Nav>

                            <Nav>
                                <Link className='nav-link' to={'/register'}>
                                    Register
                                </Link>
                            </Nav>
                        </>}
                        {isAuthenticated && <>

                            <Nav>
                                <Link className='nav-link' to={'/create'}>
                                    Create Route
                                </Link>
                            </Nav>

                            <Nav>
                                <Link className='nav-link' to={'/logout'}>
                                    Logout
                                </Link>
                            </Nav>

                            <Nav>
                                <Link className='nav-link' to={'/profile'}>
                                    {userEmail}
                                </Link>
                            </Nav>

                        </>}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};