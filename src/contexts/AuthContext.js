import { createContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from '../hooks/useLocalCrorage';

import * as userService from '../services/userService';
import * as validation from '../utils/validation';

export const AuthContext = createContext();

export const AuthProvider = ({
    children,
}) => {

    const [auth, setAuth] = useLocalStorage('auth', {});

    const navigate = useNavigate();

    const onLoginSubmit = async (data) => {

        try {

            validation.ValidationLogin(data);

            const result = await userService.login(data);

            setAuth(result);

            navigate('/catalog');
        } catch (err) {
            alert(err);
        }
    };

    const onRegisterSubmit = async (data) => {

        try {

            validation.ValidationRegister(data);

            const { confirmPassword, ...registerData } = data;

            registerData.firstName = '';
            registerData.lastName = '';

            const result = await userService.register(registerData);

            setAuth(result);

            navigate('/catalog');

        } catch (err) {
            alert(err);
        }
    };

    const onLogout = async () => {

        try {
            await userService.logout();
            onClearLocalStorage();
        } catch(err) {
            onClearLocalStorage();
        }
    };

    const onLoggedInUser = async () => {
        const result = await userService.getLoggedInUser();
        return (result);
    }

    const onChangeUserDetails = async (data) => {
        const result = await userService.editUserData(data._id, data);
        console.log(result);
        navigate('/catalog');
    }

    const onClearLocalStorage = () => {
        setAuth({});
    }

    const context = {
        onLoginSubmit,
        onRegisterSubmit,
        onLogout,
        onLoggedInUser,
        onChangeUserDetails,
        onClearLocalStorage,
        userId: auth._id,
        token: auth.accessToken,
        userEmail: auth.email,
        userImageUrl: auth.imageUrl,
        isAuthenticated: !!auth.accessToken,
    }

    return (
        <>
            <AuthContext.Provider value={context}>
                {children}
            </AuthContext.Provider>
        </>

    );
}