import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';

import * as userService from './services/userService';
import * as routeService from './services/routeService';

import { AuthContext } from './contexts/AuthContext'

import { CatalogPage } from './components/CatalogPage/CatalogPage';

import { Navigation } from "./components/Header/Navigation";

import { HomePage } from "./components/HomePage/HomePage";
import { LoginPage } from "./components/LoginPage/LoginPage";
import { RegisterPage } from './components/RegisterPage/RegisterPage';
import { LogoutPage } from './components/LogoutPage/LogoutPage';
import { ProfilePage } from './components/ProfilePage/ProfilePage';
import { ErrorPage } from './components/ErrorPage/ErrorPage';
import { CreatePage } from './components/CreatePage/CreatePage';
import { RouteDetailsPage } from './components/CatalogPage/RouteDetailsPage';



function App() {

    const [auth, setAuth] = useState({});
    const [routes, setRoutes] = useState([]);

    const navigate = useNavigate();


    useEffect(() => {
        routeService.getAllRoutes()
        .then(result => {
            setRoutes(result);
        })
    }, []);

    const onRouteCreateSubmit = async (data, token) => {

        const newRoute = await routeService.createRoute(data, token);

        setRoutes(state => [...state, newRoute]);

        navigate("/catalog");

        console.log(data)

    } 





    const onLoginSubmit = async (data) => {

        //todo validation

        const result = await userService.login(data);

        console.log(data);

        setAuth(result);

        navigate('/catalog');
    };

    const onRegisterSubmit = async (data) => {

        //todo validation
        // if (data.password !== data.confirmPassword) {
        //     return alert('Confirm Password don\'t match!');
        // }

        const { confirmPassword, ...registerData } = data;

        console.log(registerData);
        console.log(data);

        registerData.imageUrl = '../images/userImage.png' ;

        const result = await userService.register(registerData);

        setAuth(result);


        navigate('/catalog');


    };

    const onLogout = async (token) => {

        console.log(token);

        await userService.logout(token);


        setAuth({});
    };

    const onLoggedInUser = async (token) => {

        const result = await userService.getLoggedInUser(token);

        return(result);

    }



    const context = {
        onLoginSubmit,
        onRegisterSubmit,
        onLogout,
        onLoggedInUser,
        userId: auth._id,
        token: auth.accessToken,
        userEmail: auth.email,
        isAuthenticated: !!auth.accessToken,
        routes,
        onRouteCreateSubmit,
    }


    return (

        <AuthContext.Provider value={context}>
            <>

                <Navigation />

                <Routes>

                    <Route path='/' element={<HomePage />} />
                    <Route path='/catalog' element={<CatalogPage />} />
                    <Route path='/catalog/:routeId' element={ <RouteDetailsPage /> } />
                    <Route path='/login' element={<LoginPage />} />
                    <Route path='/logout' element={<LogoutPage />} />
                    <Route path='/create' element={<CreatePage />} />
                    <Route path='/register' element={<RegisterPage />} />
                    <Route path='/profile' element={ <ProfilePage /> } />
                    <Route path='*' element={ <ErrorPage /> } />


                </Routes>

            </>
        </AuthContext.Provider>
    );
}

export default App;
