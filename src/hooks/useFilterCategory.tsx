import { useEffect, useState } from "react";
import { Posts } from "../interfaces";

export const useFilterCategory = (posts: Posts[], category: string) => {
    const [filterPosts, setFilterPosts] = useState<Posts[]>([]);
    useEffect(() => {
        const filter = posts?.filter((post) => post.category === category);
        setFilterPosts(filter);
    }, [category, posts]);

    return { filterPosts };
};
