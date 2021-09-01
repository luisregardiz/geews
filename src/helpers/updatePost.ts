import { Session } from "@supabase/supabase-js";
import axios from "axios";
import toast from "react-hot-toast";
import { Posts } from "../interfaces";

export const updatePost = async (post: Posts, session: Session) => {
    try {
        const url = `${process.env.REACT_APP_SUPABASE_URL}/rest/v1/posts?id=eq.${post.id}`;
        const update = await axios({
            method: "patch",
            url,
            data: post,
            headers: {
                apikey: process.env.REACT_APP_SUPABASE_ANON_KEY,
                Authorization: `Bearer ${session.access_token}`,
            },
        });
        if (update) {
            toast.success("Updated post successfully");
        }

        return update;
    } catch (error) {
        console.log(error);
        toast.error(error.message);
    }
};
