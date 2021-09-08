import {
    PencilAltIcon,
    RefreshIcon,
    TrashIcon,
    XIcon,
} from "@heroicons/react/outline";
import { FC, useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import { colorCategory } from "../../helpers/colorCategory";
import { deletePost } from "../../helpers/deletePost";
import { updatePost } from "../../helpers/updatePost";
import { BlogFormEvent, Posts } from "../../interfaces";
import UserInfo from "./UserInfo";

interface PostContentProps {
    post: Posts;
}

const PostContent: FC<PostContentProps> = ({ post }) => {
    const { userData, session } = useContext(UserContext);
    const { id, title, body, image, user_id, author, category } = post;
    const initialValues = {
        id,
        title,
        body,
        image,
        user_id,
        author,
        category,
    };
    const [isEdit, setIsEdit] = useState(false);
    const [editPost, setEditPost] = useState(initialValues);
    const history = useHistory();

    const handleDelete = () => {
        deletePost(id, session);
        history.push("/blog");
    };

    const handleEditPost = (ev: BlogFormEvent) => {
        const { name, value } = ev.target;
        setEditPost((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleUpdatePost = () => {
        updatePost(editPost, session);
        setIsEdit(false);
        setTimeout(() => {
            history.go(0);
        }, 1000);
    };

    return (
        <article className="col-span-3 flex flex-col items-center space-y-8 my-10 ">
            <div className="flex items-center flex-col">
                {!isEdit ? (
                    <h1 className="md:text-5xl text-3xl font-black">{title}</h1>
                ) : (
                    <input
                        type="text"
                        name="title"
                        value={editPost.title}
                        onChange={(ev) => handleEditPost(ev)}
                        className="w-full h-full text-5xl font-black mb-5 rounded-md shadow"
                    />
                )}
            </div>
            <div
                className={`self-start bg-${colorCategory(
                    category
                )} px-4 rounded-lg shadow-lg`}
            >
                <span className="uppercase font-black text-xs text-white">
                    {category}
                </span>
            </div>
            <img
                src={image}
                alt={title}
                className="object-cover md:w-4/5 w-full h-3/6 rounded-lg shadow-lg self-center"
            />
            <UserInfo user_id={user_id} userData={userData} />
            <div className="md:max-w-screen-md w-auto leading-relaxed border-t-2 text-lg py-4">
                {!isEdit ? (
                    <p className="whitespace-pre-line">{body}</p>
                ) : (
                    <div className="w-full">
                        <textarea
                            className="w-full h-screen text-lg rounded-md shadow resize-none"
                            name="body"
                            cols={100}
                            value={editPost.body}
                            onChange={(ev) => handleEditPost(ev)}
                        ></textarea>
                    </div>
                )}
            </div>
            {userData?.id === user_id && (
                <div className="flex space-x-4">
                    {!isEdit ? (
                        <>
                            <button
                                onClick={handleDelete}
                                className="bg-red-500 btn-post"
                            >
                                Delete post <TrashIcon className="w-5 ml-1" />
                            </button>
                            <button
                                onClick={() => setIsEdit((prev) => !prev)}
                                className="bg-blue-600 btn-post"
                            >
                                Edit <PencilAltIcon className="w-5 ml-1" />
                            </button>
                        </>
                    ) : (
                        <>
                            <button
                                onClick={() => setIsEdit((prev) => !prev)}
                                className="bg-red-500 btn-post"
                            >
                                Cancel <XIcon className="w-5 ml-1" />
                            </button>
                            <button
                                onClick={handleUpdatePost}
                                className="bg-blue-600 btn-post"
                            >
                                Update <RefreshIcon className="w-5 ml-1" />
                            </button>
                        </>
                    )}
                </div>
            )}
        </article>
    );
};

export default PostContent;
