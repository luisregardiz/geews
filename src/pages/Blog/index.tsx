// import { PostgrestError } from "@supabase/supabase-js";
import { FC } from "react";
import useSWR from "swr";
import BlogList from "../../components/Posts";
import { fetcherPosts } from "../../helpers/fetcherposts";
import Spinner from "../../components/Spinner";
import { Posts } from "../../interfaces";

export interface BlogProps {}

const Blog: FC<BlogProps> = () => {
    const { data: posts, error } = useSWR(
        `${process.env.REACT_APP_SUPABASE_URL}/rest/v1/posts?select=*`,
        fetcherPosts
    );

    if (error) return <p>Sorry bruh</p>;
    if (!posts) return <Spinner />;

    return (
        <div className="section min-h-screen">
            <BlogList blogs={posts as Posts[]} />
        </div>
    );
};

export default Blog;
