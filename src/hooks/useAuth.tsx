import { User } from "@supabase/supabase-js";
import { useEffect, useState } from "react";

export const useAuth = (userData: User) => {
    const [isLogged, setIsLogged] = useState(false);

    useEffect(() => {
        if (Object.entries(userData).length > 1) return setIsLogged(true);
        if (Object.entries(userData).length < 1) return setIsLogged(false);
    }, [userData]);

    return {
        isLogged,
    };
};
