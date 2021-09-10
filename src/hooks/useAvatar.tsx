import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

export const useAvatar = (url: string) => {
    const [avatarUrl, setAvatarUrl] = useState<string>("");

    const downloadImage = async (path: string) => {
        try {
            const { data, error } = await supabase.storage
                .from("avatars")
                .download(path);
            if (error) {
                throw error;
            }
            const url = URL.createObjectURL(data);

            return setAvatarUrl(url);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        if (url) {
            downloadImage(url);
        }
    }, [url]);

    return {
        avatarUrl,
    };
};
