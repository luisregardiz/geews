import axios from "axios";
import { Profile } from "../interfaces";

export const fetcherProfile = async (url: string) => {
    const { data } = await axios.get<Profile[]>(url, {
        headers: {
            apikey: process.env.REACT_APP_SUPABASE_ANON_KEY,
            Authorization: `Bearer ${process.env.REACT_APP_SUPABASE_ANON_KEY}`,
        },
    });

    return data;
};
