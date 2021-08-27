import { FC, useEffect, useState } from "react";
import { supabase } from "../../supabaseClient";

export interface AccountProps {}

interface UserData {
    username: string;
    website: string;
    avatar_url: string;
}

const Account: FC<AccountProps> = () => {
    const initialState: UserData = {
        username: "",
        website: "",
        avatar_url: "",
    };
    const [userData, setUserData] = useState(initialState);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        const getProfile = async () => {
            try {
                setLoading(true);
                const user = supabase.auth.user();
                if (!user) return;
                const { data, error, status } = await supabase
                    .from("profiles")
                    .select("username, website, avatar_url")
                    .eq("id", user.id)
                    .single();

                if (error && status !== 406) throw error;
                if (!data) return;
                setUserData(data);
            } catch (error) {
                console.log(error.message);
            } finally {
                setLoading(false);
            }
        };
        getProfile();
    }, []);

    console.log(userData);

    return <div>Account</div>;
};

export default Account;
