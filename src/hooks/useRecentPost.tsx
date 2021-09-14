import { useEffect, useState } from "react";

import { Posts } from "../interfaces";

export const useRecentPost = (posts: Posts[]) => {
    const [recentPost, setRecentPost] = useState<Posts[]>([]);

    useEffect(() => {
        const recentPost = posts?.sort(
            (a: Posts, b: Posts) =>
                Date.parse(b.created_at as string) -
                Date.parse(a.created_at as string)
        );

        return setRecentPost(recentPost);
    }, [posts]);

    return { recentPost };
};
