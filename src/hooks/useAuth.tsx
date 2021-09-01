import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
export const useAuth = () => {
    const { userData } = useContext(UserContext);
    const [isLogged, setIsLogged] = useState(false);

    useEffect(() => {
        if (Object.entries(userData).length > 1) return setIsLogged(true);
        setIsLogged(false);
    }, [userData]);

    return {
        isLogged,
    };
};
