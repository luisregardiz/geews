import { useEffect, useState } from "react";

import { Posts } from "../interfaces";

export const useRecentPost = (posts: Posts[], limit?: number) => {
    const [recentPost, setRecentPost] = useState<Posts[]>([]);

    useEffect(() => {
        const recentPost = posts?.sort(
            (a: Posts, b: Posts) =>
                Date.parse(b.created_at as string) -
                Date.parse(a.created_at as string)
        );

        if (limit) {
            const limitPosts = recentPost?.slice(0, limit);
            return setRecentPost(limitPosts);
        }
        return setRecentPost(recentPost);
    }, [posts, limit]);

    return { recentPost };
};
