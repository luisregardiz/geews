import { FC } from "react";
import { useParams } from "react-router";
import useSWR from "swr";
import NetworkError from "../../../components/Error/NetworkError";
import FilterSection from "../../../components/FilterSection";
import Loader from "../../../components/Loader";
import { fetcherPosts } from "../../../helpers/fetcherposts";
import { Posts } from "../../../interfaces";
import BlogList from "../../../components/Posts";

interface PostsCategoryProps {}
type Params = {
    category: string;
};
const PostsCategory: FC<PostsCategoryProps> = () => {
    const { category } = useParams<Params>();

    const { data: posts, error } = useSWR(
        `${process.env.REACT_APP_SUPABASE_URL}/rest/v1/posts?category=eq.${category}`,
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
            <h1 className="md:text-6xl text-3xl font-black">{category}</h1>
            <FilterSection />
            {posts.length < 1 && (
                <h4 className="text-2xl font-black">
                    There are no posts in this category.
                </h4>
            )}
            <BlogList posts={posts as Posts[]} />
        </main>
    );
};

export default PostsCategory;
