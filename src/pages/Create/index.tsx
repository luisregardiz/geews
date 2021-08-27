import { useState } from "react";
import { useHistory } from "react-router-dom";
import CreateForm from "../../components/CreatePost";

import { CreateBlog } from "../../interfaces";

const Create = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const history = useHistory();

    const postBlog = async (blog: CreateBlog) => {
        const settings = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(blog),
        };

        try {
            setIsLoading(true);
            const res = await fetch("http://localhost:4000/blogs/", settings);
            const data = await res.json();
            setIsLoading(false);
            history.push("/blog");
            return data;
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="section">
            <div className=" flex flex-col items-center justify-center">
                <h1 className="text-4xl font-bold my-10">Create a New Blog</h1>
                <CreateForm
                    postBlog={postBlog}
                    isLoading={isLoading}
                    error={error}
                />
            </div>
        </div>
    );
};

export default Create;
