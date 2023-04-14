import { useContext } from "react";
import { Navigate, Outlet, useParams } from "react-router-dom";

import { AuthContext } from "../../contexts/AuthContext";
import { RouteContext } from "../../contexts/RouteContext";

export const OwnerGuard = ({
    children,
}) => {
    const { routeId } = useParams();
    const { getRoute } = useContext(RouteContext);
    const { userId } = useContext(AuthContext);

    const currentRoute = getRoute(routeId);

    if (currentRoute && currentRoute._ownerId !== userId) {
        return <Navigate to={`/catalog/${routeId}`} />
    }

    return children ? children : <Outlet /> ; 

};