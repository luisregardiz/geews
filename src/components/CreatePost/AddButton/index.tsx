import { FC, useState } from "react";
import { FaTwitter, FaYoutube } from "react-icons/fa";
import { BlogFormEvent, CreatePost } from "../../../interfaces";

interface AddButtonProps {
    newPost: CreatePost;
    handleNewPost: (ev: BlogFormEvent) => void;
    type: string;
}

const AddButton: FC<AddButtonProps> = ({ newPost, handleNewPost, type }) => {
    const [isOpen, setOpen] = useState(false);
    return (
        <div className="flex items-center space-x-4">
            <button
                type="button"
                onClick={() => setOpen((prev) => !prev)}
                className="btn bg-black text-white capitalize"
            >
                {type}
                {type === "youtube" ? (
                    <FaYoutube className="ml-2" />
                ) : (
                    <FaTwitter className="ml-2" />
                )}
            </button>
            {isOpen && (
                <div className="flex items-center">
                    <label
                        htmlFor={type}
                        className="font-bold bg-black px-2 py-1 border-2 border-black text-white"
                    >
                        {type === "youtube"
                            ? "https://youtu.be/"
                            : "https://twitter.com/User/status/"}
                    </label>
                    <input
                        type="text"
                        placeholder="ID"
                        id={type}
                        name={type}
                        value={
                            type === "youtube"
                                ? newPost.youtube
                                : newPost.twitter
                        }
                        className="border-2 px-2 py-1 border-black "
                        onChange={(ev) => handleNewPost(ev)}
                    />
                </div>
            )}
        </div>
    );
};

export default AddButton;
