import { Session, User } from "@supabase/supabase-js";
import { createContext, ReactNode, useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

type UserTypeContext = {
    session: Session;
    userData: User;
    setUserData: React.Dispatch<React.SetStateAction<User>>;
};
export const UserContext = createContext({} as UserTypeContext);
interface UserProviderType {
    children: ReactNode;
}

export const UserProvider = ({ children }: UserProviderType) => {
    const [session, setSession] = useState<Session>({} as Session);
    const [userData, setUserData] = useState<User>({} as User);

    useEffect(() => {
        const userSession = supabase.auth.session();
        if (!userSession) return;
        setSession((prev) => ({
            ...prev,
            ...userSession,
        }));
        setUserData((prev) => ({
            ...prev,
            ...userSession.user,
        }));

        supabase.auth.onAuthStateChange((_event, session) => {
            setSession((prev) => ({
                ...prev,
                ...session,
            }));
            setUserData((prev) => ({
                ...prev,
                ...session?.user,
            }));
        });
    }, []);
    console.log(userData);
    return (
        <UserContext.Provider
            value={{
                session,
                userData,
                setUserData,
            }}
        >
            {children}
        </UserContext.Provider>
    );
};
