import { FC, useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import { colorCategory } from "../../helpers/colorCategory";
import { Posts } from "../../interfaces";
import UserInfo from "./UserInfo";

export interface PostsListProps {
    posts: Posts[];
}

const PostsList: FC<PostsListProps> = ({ posts }) => {
    const { userData } = useContext(UserContext);

    return (
        <div className="blog-list my-5 ">
            {posts?.map(({ id, title, body, image, user_id, category }) => (
                <div
                    key={id}
                    className="rounded-lg shadow-lg p-4 md:first:col-span-2 "
                >
                    <Link to={`/post/${id}`}>
                        <img
                            src={image}
                            alt={title}
                            className="h-48 w-full object-cover rounded-lg mb-2"
                        />
                        <h2 className="text-xl font-bold ">{title}</h2>
                        <p className="my-2 truncate">{body}</p>
                    </Link>
                    <div className="flex items-center justify-between">
                        <UserInfo user_id={user_id} userData={userData} />
                        <span
                            className={`text-xs font-bold text-white uppercase py-1 px-2 rounded-lg bg-${colorCategory(
                                category
                            )} `}
                        >
                            {category}
                        </span>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default PostsList;
