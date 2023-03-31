import { createContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from '../hooks/useLocalCrorage';

import * as userService from '../services/userService';

export const AuthContext = createContext();

export const AuthProvider = ({
    children,
}) => {

    // const [auth, setAuth] = useState({});
    const [auth, setAuth] = useLocalStorage('auth', {});

    const navigate = useNavigate();

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
        registerData.firstName = '';
        registerData.lastName = '';


        const result = await userService.register(registerData);

        setAuth(result);


        navigate('/catalog');

    };

    const onLogout = async () => {

        console.log();

        
        await userService.logout();
        // setAuth({});
        onClearLocalStorage();
        
    };


    const onLoggedInUser = async () => {

        const result = await userService.getLoggedInUser();

        return(result);

    }

    const onChangeUserDetails = async (data) => {
        console.log(data);

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