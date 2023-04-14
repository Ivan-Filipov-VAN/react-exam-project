import { useContext } from 'react';
import { Navigate, Outlet  } from 'react-router-dom'; 

import { AuthContext } from '../../contexts/AuthContext';

export const RouteGuard = ({
    children,
}) => {
    const { isAuthenticated } = useContext(AuthContext);

    if (!isAuthenticated) {
        console.log(isAuthenticated);
        return <Navigate to='/login' />
    }

    return children ? children : <Outlet/>;

};