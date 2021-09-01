import { FC, useContext, useState } from "react";
import { UserContext } from "../../context/UserContext";
import { BlogFormEvent, CreatePost, SubmitType } from "../../interfaces";

interface CreateFormProps {
    postBlog: (blog: CreatePost) => void;
    error: boolean;
}

const CreateForm: FC<CreateFormProps> = ({ postBlog, error }) => {
    const initialValue: CreatePost = {
        title: "",
        body: "",
        image: "",
    };
    const [newPost, setNewPost] = useState(initialValue);
    const { userData } = useContext(UserContext);
    const customId = userData.id.slice(0, 6);
    const authorPost = userData?.user_metadata?.full_name || `Geek_${customId}`;
    const authorAvatar = userData?.user_metadata?.avatar_url;
    const handleNewPost = (ev: BlogFormEvent) => {
        const { name, value } = ev.target;

        setNewPost((prev) => ({
            ...prev,
            [name]: value,
            author: authorPost,
            user_id: userData?.id,
            author_avatar: authorAvatar,
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
                <label htmlFor="image" className="font-bold">
                    Post image
                </label>
                <input
                    type="text"
                    name="image"
                    value={newPost.image}
                    placeholder="Url..."
                    className="input-line-style"
                    onChange={(ev) => handleNewPost(ev)}
                    required
                />
            </div>
            <span>Author: {authorPost}</span>
            <button type="submit" className="btn-login">
                Add Blog
            </button>
        </form>
    );
};

export default CreateForm;
