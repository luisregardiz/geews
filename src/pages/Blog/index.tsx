// import { PostgrestError } from "@supabase/supabase-js";
import { FC } from "react";
import useSWR from "swr";
import BlogList from "../../components/Posts";
import { fetcherPosts } from "../../helpers/fetcherposts";
import { Posts } from "../../interfaces";
import Loader from "../../components/Loader";
import NetworkError from "../../components/Error/NetworkError";

export interface BlogProps {}

const Blog: FC<BlogProps> = () => {
    const { data: posts, error } = useSWR(
        `${process.env.REACT_APP_SUPABASE_URL}/rest/v1/posts?select=*`,
        fetcherPosts
    );

    if (error)
        return (
            <div className="min-h-screen">
                {error.message === "Network Error" && <NetworkError />}
            </div>
        );
    if (!posts) return <Loader />;

    return (
        <div className="section min-h-screen">
            <BlogList posts={posts as Posts[]} />
        </div>
    );
};

export default Blog;
