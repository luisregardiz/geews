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
import YoutubeEmbed from "./YoutubeEmbed";
import TweetEmbed from "react-tweet-embed";
import BodyContent from "./BodyContent";
import UserInfo from "./UserInfo";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { modules, formats } from "../../helpers/customToolbar";

interface PostContentProps {
    post: Posts;
}

const PostContent: FC<PostContentProps> = ({ post }) => {
    const { userData, session } = useContext(UserContext);
    const {
        id,
        title,
        body,
        user_id,
        author,
        image,
        category,
        youtube,
        twitter,
    } = post;
    const initialValues = {
        id,
        title,
        image,
        body,
        user_id,
        author,
        category,
        youtube,
        twitter,
    };
    const [isEdit, setIsEdit] = useState(false);
    const [editPost, setEditPost] = useState(initialValues);
    const [editEditor, setEditEditor] = useState(body);
    const history = useHistory();

    const handleDelete = () => {
        deletePost(id, session);
        history.push("/posts");
    };

    const handleEditPost = (ev: BlogFormEvent) => {
        const { name, value } = ev.target;
        setEditPost((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleUpdatePost = () => {
        const finallyEdit = { ...editPost, body: editEditor };
        updatePost(finallyEdit, session);
        setIsEdit(false);
        setTimeout(() => {
            history.go(0);
        }, 500);
    };

    return (
        <article className="col-span-3 flex flex-col items-center  my-10 ">
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
                )} px-4 rounded-lg shadow-lg my-8`}
            >
                <span className="uppercase font-black text-xs text-white">
                    {category}
                </span>
            </div>
            <img
                src={image}
                alt={title}
                className="object-cover md:w-4/5 w-full h-3/6 rounded-lg shadow-lg self-center mb-8"
            />
            <UserInfo user_id={user_id} userData={userData} />
            <div className="bg-gray-300 h-1 w-1/3 inline-flex my-8"></div>
            {!isEdit ? (
                <BodyContent body={body as string} />
            ) : (
                <ReactQuill
                    theme="snow"
                    value={editEditor}
                    modules={modules}
                    formats={formats}
                    onChange={setEditEditor}
                />
            )}
            {youtube &&
                (!isEdit ? (
                    <YoutubeEmbed embedId={youtube} />
                ) : (
                    <div className="flex items-center mt-20 mb-8">
                        <label
                            htmlFor="youtube"
                            className="font-bold bg-black text-white py-2 px-4"
                        >
                            https://youtu.be/
                        </label>
                        <input
                            type="text"
                            name="youtube"
                            id="youtube"
                            value={editPost.youtube}
                            onChange={(ev) => handleEditPost(ev)}
                            className="w-auto h-full "
                        />
                    </div>
                ))}
            {twitter && <TweetEmbed id={twitter} />}
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
