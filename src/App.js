import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';

import * as routeService from './services/routeService';

import { AuthProvider } from './contexts/AuthContext'

import { CatalogPage } from './components/CatalogPage/CatalogPage';

import { NavigationSec } from "./components/Navigation/NavigationSec";

import { HomePage } from "./components/HomePage/HomePage";
import { LoginPage } from "./components/LoginPage/LoginPage";
import { RegisterPage } from './components/RegisterPage/RegisterPage';
import { LogoutPage } from './components/LogoutPage/LogoutPage';
import { ProfilePage } from './components/ProfilePage/ProfilePage';
import { ErrorPage } from './components/ErrorPage/ErrorPage';
import { CreatePage } from './components/CreatePage/CreatePage';
import { RouteDetailsPage } from './components/CatalogPage/RouteDetailsPage';
import { EditRoute } from './components/EditRoute/EditRoute';
import { EditProfilePage } from './components/ProfilePage/EditProfilePage';
import { Footer } from './components/Footer/Footer';

function App() {
    const [routes, setRoutes] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        routeService.getAllRoutes()
        .then(result => {
            setRoutes(result);
        })
    }, []);

    const onRouteCreateSubmit = async (data) => {
        const newRoute = await routeService.createRoute(data);
        setRoutes(state => [...state, newRoute]);
        navigate("/catalog");
    } 

    const onRouteEditSubmit = async (data) => {
        console.log(data);
        const newRoute = await routeService.editRoute(data._id, data);
        setRoutes(state => state.map(x => x._id === data._id ? newRoute : x));
        navigate("/catalog");
    };

    const onDeleteRoute = (routeId) => {
        routeService.deleteRoute(routeId);
        setRoutes(state => state.filter(x => x._id !== routeId));
        navigate("/catalog");
    }


    return (
        <AuthProvider>
            <>
                <NavigationSec />
                <Routes>
                    <Route path='/' element={<HomePage routes={routes}/>} />
                    <Route path='/catalog' element={<CatalogPage routes={routes}/>} />
                    <Route path='/catalog/:routeId' element={ <RouteDetailsPage onDeleteRoute={onDeleteRoute}/> } />
                    <Route path='/catalog/:routeId/edit' element={ <EditRoute onRouteEditSubmit={onRouteEditSubmit} /> } />
                    <Route path='/login' element={<LoginPage />} />
                    <Route path='/logout' element={<LogoutPage />} />
                    <Route path='/create' element={<CreatePage onRouteCreateSubmit={onRouteCreateSubmit}/>} />
                    <Route path='/register' element={<RegisterPage />} />
                    <Route path='/profile' element={ <ProfilePage /> } />
                    <Route path='/profile/:userId/editProfile' element={ <EditProfilePage /> }/>
                    <Route path='*' element={ <ErrorPage /> } />
                </Routes>
                
                <Footer />
            </>
        </AuthProvider>
    );
}

export default App;
