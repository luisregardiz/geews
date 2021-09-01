import { Session } from "@supabase/supabase-js";
import axios from "axios";
import toast from "react-hot-toast";

export const deletePost = async (id: number, session: Session) => {
    try {
        const url = `${process.env.REACT_APP_SUPABASE_URL}/rest/v1/posts?id=eq.${id}`;
        const remove = await axios.delete(url, {
            headers: {
                apikey: process.env.REACT_APP_SUPABASE_ANON_KEY,
                Authorization: `Bearer ${session.access_token}`,
            },
        });
        if (remove) {
            toast.success("Post successfully removed");
        }
        return remove;
    } catch (error) {
        console.log(error);
        toast.error(error.message);
    }
};
