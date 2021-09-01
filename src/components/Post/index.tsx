import { TrashIcon } from "@heroicons/react/outline";
import { FC, useContext, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import { deletePost } from "../../helpers/deletePost";
import { updatePost } from "../../helpers/updatePost";
import { BlogFormEvent, Posts } from "../../interfaces";

interface PostContentProps {
    post: Posts;
}

const PostContent: FC<PostContentProps> = ({ post }) => {
    const { userData, session } = useContext(UserContext);
    const { id, title, body, image, user_id, author, author_avatar } = post;
    const initialValues = {
        id,
        title,
        body,
        image,
        user_id,
        author,
        author_avatar,
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
        <article className="col-span-3 flex flex-col items-center space-y-5 my-10 ">
            <div className="flex items-center flex-col">
                {!isEdit ? (
                    <h1 className="text-5xl font-black mb-5">{title}</h1>
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
            <img
                src={image}
                alt={title}
                className="object-cover md:w-4/5 w-full h-3/6 rounded-lg shadow-lg self-center"
            />
            <div className="flex  items-center space-x-5 self-start  rounded-md shadow-xl px-5 py-3 border-t-2 border-yellow-400">
                <div className="w-12 h-12 rounded-full bg-black flex items-center justify-center shadow-lg ">
                    {author_avatar && (
                        <img
                            src={author_avatar}
                            className="object-cover w-12 h-12 rounded-full"
                            alt={title}
                        />
                    )}
                </div>
                <div className="flex flex-col">
                    <Link
                        to={
                            userData?.id === user_id
                                ? "/account"
                                : `/profile/${user_id}`
                        }
                        className="text-xl font-bold capitalize hover:underline"
                    >
                        {author}
                    </Link>
                    <span className=" italic">Blogger | Geek</span>
                </div>
            </div>
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
                <div className="flex items-center space-x-4">
                    {!isEdit ? (
                        <>
                            <button
                                onClick={handleDelete}
                                className="bg-red-500 text-lg text-white font-bold py-2 px-4 rounded flex items-center shadow-xl"
                            >
                                Delete post <TrashIcon className="w-5 ml-1" />
                            </button>
                            <button
                                onClick={() => setIsEdit((prev) => !prev)}
                                className="bg-blue-600 font-bold text-white py-2 px-4 rounded flex items-center shadow-xl text-lg"
                            >
                                Edit
                            </button>
                        </>
                    ) : (
                        <>
                            <button
                                onClick={() => setIsEdit((prev) => !prev)}
                                className="bg-red-500 text-lg text-white font-bold py-2 px-4 rounded flex items-center shadow-xl"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleUpdatePost}
                                className="bg-blue-600 font-bold text-white py-2 px-4 rounded flex items-center shadow-xl text-lg"
                            >
                                Update
                            </button>
                        </>
                    )}
                </div>
            )}
        </article>
    );
};

export default PostContent;
