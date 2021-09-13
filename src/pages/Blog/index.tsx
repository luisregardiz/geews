// import { PostgrestError } from "@supabase/supabase-js";
import { FC } from "react";
import useSWR from "swr";
import BlogList from "../../components/Posts";
import { fetcherPosts } from "../../helpers/fetcherposts";
import { Posts } from "../../interfaces";
import Loader from "../../components/Loader";
import NetworkError from "../../components/Error/NetworkError";
import FilterSection from "../../components/FilterSection";

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
        <main className="section min-h-screen">
            <h1 className="md:text-6xl text-3xl font-black">all posts</h1>
            <FilterSection />
            <BlogList posts={posts as Posts[]} />
        </main>
    );
};

export default Blog;
