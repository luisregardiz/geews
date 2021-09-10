import axios from "axios";

export const avatarProfile = async (url: string) => {
    const { data } = await axios.get(url, {
        headers: {
            apikey: process.env.REACT_APP_SUPABASE_ANON_KEY,
            Authorization: `Bearer ${process.env.REACT_APP_SUPABASE_ANON_KEY}`,
        },
    });
    return data;
};
