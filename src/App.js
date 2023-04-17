import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext'
import { RouteProvider } from './contexts/RouteContext';
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
import { AboutPage } from './components/AoutPage/AboutPage';
import { RouteGuard } from './components/common/RouteGuard';
import { OwnerGuard } from './components/common/OwnerGuard';
import { PlaceDetailsPage } from './components/CatalogPage/PlaceDetailsPage'
import { CatalogPagePlace } from './components/CatalogPage/CatalogPagePlace';
import { EditPlace } from './components/EditRoute/EditPlace';
import { PlaceProvider } from './contexts/PlaceContext';

function App() {

    return (
        <AuthProvider>
            <PlaceProvider>
                <RouteProvider>
                    <>
                        <NavigationSec />
                        <Routes>
                            <Route path='/' element={<HomePage />} />
                            <Route path='/catalog' element={<CatalogPage />} />
                            <Route path='/catalog/:routeId' element={<RouteDetailsPage />} />
                            <Route path='/catalogPlace' element={<CatalogPagePlace />} />
                            <Route path='/catalogPlace/:placeId' element={<PlaceDetailsPage />} />
                            <Route path='/login' element={<LoginPage />} />
                            <Route path='/register' element={<RegisterPage />} />
                            <Route path='/about' element={<AboutPage />} />
                            <Route path='*' element={<ErrorPage />} />

                            <Route element={<RouteGuard />}>
                                <Route path='/create' element={<CreatePage />} />
                                <Route path='/logout' element={<LogoutPage />} />

                            </Route>

                            <Route element={<OwnerGuard />}>
                                <Route path='/catalog/:routeId/edit' element={<EditRoute />} />
                                <Route path='/catalogPlace/:placeId/edit' element={<EditPlace />} />
                            </Route>


                            <Route path='/profile' element={<ProfilePage />} />
                            <Route path='/profile/:userId/editProfile' element={<EditProfilePage />} />
                        </Routes>

                        <Footer />
                    </>
                </RouteProvider>
            </PlaceProvider>
        </AuthProvider>
    );
}

export default App;
