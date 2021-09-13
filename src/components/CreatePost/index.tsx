import { PlusIcon, UserIcon } from "@heroicons/react/outline";
import { FC, useContext, useState } from "react";
import { VscLoading } from "react-icons/vsc";
import ReactQuill from "react-quill";
import { UserContext } from "../../context/UserContext";
import { BlogFormEvent, CreatePost, SubmitType } from "../../interfaces";
import Categories from "./Categories";
import { modules, formats } from "../../helpers/customToolbar";
import "react-quill/dist/quill.snow.css";
import AddButton from "./AddButton";

interface CreateFormProps {
    postBlog: (blog: CreatePost) => void;
    error: boolean;
    loading: boolean;
}

const CreateForm: FC<CreateFormProps> = ({ postBlog, error, loading }) => {
    const initialValue: CreatePost = {
        title: "",
        image: "",
        body: "",
        category: "",
        twitter: "",
        youtube: "",
    };
    const [editorValue, setEditorValue] = useState("");
    const [newPost, setNewPost] = useState(initialValue);
    const { userData } = useContext(UserContext);
    const authorPost = userData?.user_metadata?.full_name;
    const handleNewPost = (ev: BlogFormEvent) => {
        const { name, value } = ev.target;

        setNewPost((prev) => ({
            ...prev,
            body: editorValue,
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
            className="space-y-5 my-10"
            onSubmit={(ev) => handleSubmitPost(ev)}
        >
            <div className="form-group">
                <label htmlFor="title" className="font-bold">
                    Title
                </label>
                <input
                    type="text"
                    name="title"
                    id="title"
                    value={newPost.title}
                    placeholder="New smartphone, gadgets..."
                    className="input-line-style"
                    onChange={(ev) => handleNewPost(ev)}
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="image" className="font-bold">
                    Image URL
                </label>
                <input
                    type="text"
                    name="image"
                    id="image"
                    value={newPost.image}
                    placeholder="https://..."
                    className="input-line-style"
                    onChange={(ev) => handleNewPost(ev)}
                    required
                />
            </div>

            <ReactQuill
                theme="snow"
                value={editorValue}
                modules={modules}
                formats={formats}
                onChange={setEditorValue}
            />

            <AddButton
                newPost={newPost}
                handleNewPost={handleNewPost}
                type="youtube"
            />
            <AddButton
                newPost={newPost}
                handleNewPost={handleNewPost}
                type="twitter"
            />
            <Categories handleNewPost={handleNewPost} />
            <span className="flex mt-2 items-center">
                <UserIcon className="w-5 mr-1" />
                Author: {authorPost}
            </span>
            <button type="submit" className="btn-login w-1/3">
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
