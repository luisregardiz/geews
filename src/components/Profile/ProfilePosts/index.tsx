import { FC } from "react";
import { Posts } from "../../../interfaces";
import PostsList from "../../Posts";

interface ProfilePostsProps {
    posts: Posts[];
}
const ProfilePosts: FC<ProfilePostsProps> = ({ posts }) => {
    return (
        <div>
            <div className="px-2">
                <h1 className="text-3xl font-bold text-gray-700">Posts</h1>
            </div>
            {posts?.length < 1 && (
                <div>
                    <p>This user has no posts</p>
                </div>
            )}
            <PostsList posts={posts as Posts[]} />
        </div>
    );
};

export default ProfilePosts;
