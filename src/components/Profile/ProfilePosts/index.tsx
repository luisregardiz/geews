import { FC } from "react";
import { Posts } from "../../../interfaces";
import BlogList from "../../Posts";

interface ProfilePostsProps {
    posts: Posts[];
}
const ProfilePosts: FC<ProfilePostsProps> = ({ posts }) => {
    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-700">Posts</h1>
            {posts?.length < 1 && (
                <div>
                    <p>This user has no posts</p>
                </div>
            )}
            <BlogList posts={posts as Posts[]} />
        </div>
    );
};

export default ProfilePosts;
