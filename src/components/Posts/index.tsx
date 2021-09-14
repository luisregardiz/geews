import { FC } from "react";
import { Link } from "react-router-dom";
import { colorCategory } from "../../helpers/colorCategory";
import { dateFormated } from "../../helpers/dateFormated";
import { useRecentPost } from "../../hooks/useRecentPost";
import { Posts } from "../../interfaces";
import UserInfo from "./UserInfo";

export interface PostsListProps {
    posts: Posts[];
}

const PostsList: FC<PostsListProps> = ({ posts }) => {
    const { recentPost } = useRecentPost(posts);

    return (
        <div className="blog-list my-5 ">
            {recentPost?.map(
                ({ id, title, created_at, user_id, category, image }) => (
                    <div
                        key={id}
                        className="rounded-lg shadow-lg p-4 md:first:col-span-2"
                    >
                        <Link className="space-y-2" to={`/post/${id}`}>
                            <img
                                src={image}
                                alt={title}
                                className="h-48 w-full object-cover rounded-lg mb-2"
                            />
                            <h2 className="text-xl font-bold ">{title}</h2>
                            <span
                                className={`text-xs font-bold text-white uppercase inline-flex py-1 px-2 rounded-lg bg-${colorCategory(
                                    category
                                )} `}
                            >
                                {category}
                            </span>
                        </Link>
                        <div className="flex items-center justify-between mt-2">
                            <UserInfo user_id={user_id} />
                            <span className="text-sm font-bold text-gray-600">
                                {dateFormated(created_at as string)}
                            </span>
                        </div>
                    </div>
                )
            )}
        </div>
    );
};

export default PostsList;
