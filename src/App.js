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

function App() {

    return (
        <AuthProvider>
            <RouteProvider>
                <>
                    <NavigationSec />
                    <Routes>
                        <Route path='/' element={<HomePage />} />
                        <Route path='/catalog' element={<CatalogPage />} />
                        <Route path='/catalog/:routeId' element={<RouteDetailsPage />} />
                        <Route path='/catalog/:routeId/edit' element={<EditRoute />} />
                        <Route path='/login' element={<LoginPage />} />
                        <Route path='/logout' element={<LogoutPage />} />
                        <Route path='/create' element={<CreatePage />} />
                        <Route path='/register' element={<RegisterPage />} />
                        <Route path='/profile' element={<ProfilePage />} />
                        <Route path='/profile/:userId/editProfile' element={<EditProfilePage />} />
                        <Route path='/about' element={<AboutPage />} />
                        <Route path='*' element={<ErrorPage />} />
                    </Routes>

                    <Footer />
                </>
            </RouteProvider>
        </AuthProvider>
    );
}

export default App;
