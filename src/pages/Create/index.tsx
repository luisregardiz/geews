import { useState } from "react";
import toast from "react-hot-toast";
import { useHistory } from "react-router-dom";
import CreateForm from "../../components/CreatePost";

import { CreatePost } from "../../interfaces";
import { supabase } from "../../supabaseClient";

const Create = () => {
    const history = useHistory();
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const postBlog = async (blog: CreatePost) => {
        try {
            setLoading(true);
            const { data, error } = await supabase.from("posts").insert([blog]);
            if (error && !data) {
                setError((prev) => !prev);
                toast.error(error.message);
                return;
            }
            if (data) {
                setLoading(false);
                toast.success("Post successfully.");
                data.map((post) => {
                    return history.push(`/post/${post.id}`);
                });
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="section">
            <div className=" flex flex-col items-center mt-10 min-h-screen">
                <h1 className="text-4xl font-bold my-10">Create a new post</h1>
                <CreateForm
                    postBlog={postBlog}
                    error={error}
                    loading={loading}
                />
            </div>
        </div>
    );
};

export default Create;
