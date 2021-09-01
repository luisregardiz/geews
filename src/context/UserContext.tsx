import { Session, User } from "@supabase/supabase-js";
import { createContext, ReactNode, useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

type UserTypeContext = {
    session: Session;
    userData: User;
    setUserData: React.Dispatch<React.SetStateAction<User>>;
    setSession: React.Dispatch<React.SetStateAction<Session>>;
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

        setSession((prev) => ({
            ...prev,
            ...userSession,
        }));
        setUserData((prev) => ({
            ...prev,
            ...userSession?.user,
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
    return (
        <UserContext.Provider
            value={{
                session,
                userData,
                setUserData,
                setSession,
            }}
        >
            {children}
        </UserContext.Provider>
    );
};
