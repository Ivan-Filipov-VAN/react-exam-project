import { useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";

import { AuthContext } from "../../contexts/AuthContext";

export const LogoutPage = () => {

    const { onLogout , token } = useContext(AuthContext);


    useEffect(() => {

        onLogout(token);

    }, [onLogout, token]);

    return (
        


        <Navigate to={'/'} />



    );
}