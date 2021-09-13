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
        `${process.env.REACT_APP_SUPABASE_URL}/rest/v1/posts?select=*`,
        fetcherPosts
    );
    if (postsError) toast.error(postsError.message);
    return (
        <div className=" rounded-lg h-screen w-full p-4 hidden flex-col  sticky top-0 mt-10 z-0 lg:flex space-y-5">
            <h1 className="text-2xl font-black ">Recent Posts</h1>
            {!posts && <Spinner />}
            <div>
                <NavCard posts={posts as Posts[]} />
            </div>
        </div>
    );
};

export default NavBlog;
