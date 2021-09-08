import { PlusIcon, UserIcon } from "@heroicons/react/outline";
import { FC, useContext, useState } from "react";
import { FaImages } from "react-icons/fa";
import { VscLoading } from "react-icons/vsc";
import { UserContext } from "../../context/UserContext";
import { BlogFormEvent, CreatePost, SubmitType } from "../../interfaces";
import Categories from "./Categories";

interface CreateFormProps {
    postBlog: (blog: CreatePost) => void;
    error: boolean;
    loading: boolean;
}

const CreateForm: FC<CreateFormProps> = ({ postBlog, error, loading }) => {
    const initialValue: CreatePost = {
        title: "",
        body: "",
        image: "",
        category: "",
    };
    const [newPost, setNewPost] = useState(initialValue);
    const { userData } = useContext(UserContext);
    const authorPost = userData?.user_metadata?.full_name;
    const handleNewPost = (ev: BlogFormEvent) => {
        const { name, value } = ev.target;

        setNewPost((prev) => ({
            ...prev,
            [name]: value,
            user_id: userData?.id,
        }));
    };

    const handleSubmitPost = (ev: SubmitType) => {
        ev.preventDefault();
        postBlog(newPost);
        if (error) return;
        setNewPost((prev) => ({ ...prev, ...initialValue }));
    };

    return (
        <form
            className="space-y-5 md:w-4/5  w-full border-2 border-black rounded-md shadow-xl p-10"
            onSubmit={(ev) => handleSubmitPost(ev)}
        >
            <div className="form-group">
                <label htmlFor="title" className="font-bold">
                    Post title
                </label>
                <input
                    type="text"
                    name="title"
                    value={newPost.title}
                    placeholder="New smartphone, gadgets..."
                    className="input-line-style"
                    onChange={(ev) => handleNewPost(ev)}
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="body" className="font-bold">
                    Post body
                </label>
                <textarea
                    name="body"
                    value={newPost.body}
                    placeholder="Add body here..."
                    className="textarea-line-style resize-none"
                    onChange={(ev) => handleNewPost(ev)}
                    required
                ></textarea>
            </div>

            <div className="form-group">
                <label htmlFor="image" className="font-bold flex items-center">
                    Post image <FaImages className="text-xl ml-2" />
                </label>
                <input
                    type="text"
                    name="image"
                    value={newPost.image}
                    placeholder="Image url..."
                    className="input-line-style"
                    onChange={(ev) => handleNewPost(ev)}
                    required
                />
            </div>
            <Categories handleNewPost={handleNewPost} />
            <span className="flex mt-2 items-center">
                <UserIcon className="w-5 mr-1" />
                Author: {authorPost}
            </span>
            <button type="submit" className="btn-login ">
                {loading ? (
                    <span className="flex items-center justify-center">
                        Adding... <VscLoading className="text-lg ml-2" />
                    </span>
                ) : (
                    <span className="flex items-center justify-center">
                        Add Blog <PlusIcon className="w-5 ml-2" />
                    </span>
                )}
            </button>
        </form>
    );
};

export default CreateForm;
