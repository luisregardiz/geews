import { PlusIcon } from "@heroicons/react/outline";
import { FC, useContext } from "react";
import { useHistory } from "react-router-dom";
import useSWR from "swr";
import { UserContext } from "../../../context/UserContext";
import { fetcherPosts } from "../../../helpers/fetcherposts";
import { Posts } from "../../../interfaces";
import NetworkError from "../../Error/NetworkError";
import Loader from "../../Loader";
import PostsList from "../../Posts";

export interface UserPostsProps {}

const UserPosts: FC<UserPostsProps> = () => {
    const { userData } = useContext(UserContext);
    const history = useHistory();

    const { data: posts, error } = useSWR(
        `${process.env.REACT_APP_SUPABASE_URL}/rest/v1/posts?user_id=eq.${userData.id}`,
        fetcherPosts
    );
    if (!posts) return <Loader />;
    if (error)
        return (
            <div className="min-h-screen">
                {error.message === "Network Error" && <NetworkError />}
            </div>
        );

    return (
        <div className="my-5 flex flex-col">
            <div className="  p-2  border-gray-500 ">
                <h1 className="text-3xl font-bold text-gray-700  ">My posts</h1>
            </div>
            {posts?.length < 1 && (
                <div
                    onClick={() => history.push("/create")}
                    className="flex flex-col self-start border-2 items-center px-4 py-10 space-y-2 rounded-md shadow-xl border-black cursor-pointer"
                >
                    <p>You don't have any post</p>
                    <span className="text-lg font-bold pb-4">
                        Create your first post
                    </span>
                    <PlusIcon className="w-6 animate-bounce" />
                </div>
            )}
            <PostsList posts={posts as Posts[]} />
        </div>
    );
};

export default UserPosts;
