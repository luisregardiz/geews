import axios from "axios";
import { Posts } from "../interfaces";

export const fetcherPost = async (url: string) => {
    const { data } = await axios.get<Posts[]>(url, {
        headers: {
            apikey: process.env.REACT_APP_SUPABASE_ANON_KEY,
            Authorization: `Bearer ${process.env.REACT_APP_SUPABASE_ANON_KEY}`,
        },
    });
    return data;
};
