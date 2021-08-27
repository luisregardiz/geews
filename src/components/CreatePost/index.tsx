import { FC, useState } from "react";
import { BlogFormEvent, CreateBlog, SubmitBlog } from "../../interfaces";

interface CreateFormProps {
    postBlog: (blog: CreateBlog) => Promise<CreateBlog>;
    isLoading: boolean;
    error: string;
}

const CreateForm: FC<CreateFormProps> = ({ postBlog, isLoading, error }) => {
    const initialValue: CreateBlog = {
        title: "",
        body: "",
        author: "",
        image: "",
    };

    const [newBlog, setNewBlog] = useState(initialValue);

    const handleNewBlog = (ev: BlogFormEvent) => {
        const { name, value } = ev.target;
        if (value === "") {
            return console.log("error");
        }
        setNewBlog((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmitBlog = (ev: SubmitBlog) => {
        ev.preventDefault();
        postBlog(newBlog);
        setNewBlog((prev) => ({ ...prev, ...initialValue }));
    };

    if (error) return <p>Opsss: {error}</p>;

    return (
        <form
            className="space-y-5 w-1/3"
            onSubmit={(ev) => handleSubmitBlog(ev)}
        >
            <div className="form-group">
                <label htmlFor="title">Blog title</label>
                <input
                    type="text"
                    name="title"
                    value={newBlog.title}
                    placeholder="New smartphone, gadgets..."
                    className="input-line-style"
                    onChange={(ev) => handleNewBlog(ev)}
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="body">Blog body</label>
                <textarea
                    name="body"
                    value={newBlog.body}
                    placeholder="Add body here..."
                    className="textarea-line-style"
                    onChange={(ev) => handleNewBlog(ev)}
                    required
                ></textarea>
            </div>
            <div className="form-group">
                <label htmlFor="author">Author</label>
                <select
                    name="author"
                    value={newBlog.author}
                    className="select-line-style"
                    onChange={(ev) => handleNewBlog(ev)}
                    required
                >
                    <option value="">--Select author--</option>
                    <option value="luis">Luis</option>
                    <option value="maria">Maria</option>
                    <option value="gamora">Gamora</option>
                    <option value="levy">Levy</option>
                </select>
            </div>
            <div className="form-group">
                <label htmlFor="image">Blog image</label>
                <input
                    type="text"
                    name="image"
                    value={newBlog.image}
                    placeholder="Url..."
                    className="input-line-style"
                    onChange={(ev) => handleNewBlog(ev)}
                    required
                />
            </div>
            <button type="submit" className="btn-submit">
                {isLoading ? "Adding Blog..." : "Add Blog"}
            </button>
        </form>
    );
};

export default CreateForm;
