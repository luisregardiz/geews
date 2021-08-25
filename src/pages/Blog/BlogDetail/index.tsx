import { FC } from "react";
import { useHistory, useParams } from "react-router-dom";
import BlogContent from "../../../components/BlogContent";
import NavBlog from "../../../components/NavBlog";
import Spinner from "../../../components/Spinner";
import useFetch from "../../../hooks/useFetch";
import { Data } from "../../../interfaces";

interface BlogDetailProps {}

type Params = {
    id: string;
};

const BlogDetail: FC<BlogDetailProps> = () => {
    const { id } = useParams<Params>();
    const history = useHistory();
    const {
        data: blog,
        isLoading,
        error,
    } = useFetch(`http://localhost:4000/blogs/${id}`);

    if (isLoading) return <Spinner />;
    if (error) return <p>Oppssss: {error} </p>;

    const handleDeleteBlog = async () => {
        const setting = {
            method: "DELETE",
        };
        try {
            const res = await fetch(
                `http://localhost:4000/blogs/${id}`,
                setting
            );
            const data = await res.json();
            history.push("/blog");
            return data;
        } catch (error) {
            console.log(error)
        }
    };

    return (
        <div className="section">
            <div className="grid grid-flow-col lg:grid-cols-4 grid-cols-1 gap-5 place-content-center px-5  ">
                <BlogContent blog={blog as Data} handleDeleteBlog={handleDeleteBlog} />

                <NavBlog />
            </div>
        </div>
    );
};

export default BlogDetail;
