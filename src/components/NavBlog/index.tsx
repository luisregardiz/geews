import { FC } from "react";
import toast from "react-hot-toast";
import useSWR from "swr";
import { fetcherPosts } from "../../helpers/fetcherposts";
import { Posts } from "../../interfaces";
import Spinner from "../Spinner";

import NavCard from "./Card";

interface NavBlogProps {}

const NavBlog: FC<NavBlogProps> = () => {
    const { data: posts, error: postsError } = useSWR<Posts[]>(
        `${process.env.REACT_APP_SUPABASE_URL}/rest/v1/posts?limit=5`,
        fetcherPosts
    );
    if (postsError) toast.error(postsError.message);
    return (
        <div className="rounded-lg w-full h-screen p-4  flex-col sticky top-0 mt-10 z-0 lg:flex hidden space-y-5">
            <h1 className="text-2xl font-black ">Recent Posts</h1>
            {!posts && <Spinner />}
            <div>
                <NavCard posts={posts as Posts[]} />
            </div>
        </div>
    );
};

export default NavBlog;
