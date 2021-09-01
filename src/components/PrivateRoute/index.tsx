import { FC, useContext } from "react";
import { Redirect, Route } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
interface PrivateRouteProps {
    path: string;
}
export const PrivateRoute: FC<PrivateRouteProps> = ({ children, ...res }) => {
    const { userData } = useContext(UserContext);

    return (
        <Route
            {...res}
            render={({ location }) =>
                userData.id?.length > 1 ? (
                    children
                ) : (
                    <Redirect
                        to={{ pathname: "/login", state: { from: location } }}
                    />
                )
            }
        />
    );
};
