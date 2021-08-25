import { FC } from "react";
import BlogList from "../../components/BlogList";
import Spinner from "../../components/Spinner";
import useFetch from "../../hooks/useFetch";
import { Data } from "../../interfaces";

export interface BlogProps {}

const Blog: FC<BlogProps> = () => {
    const {
        data: blogs,
        isLoading,
        error,
    } = useFetch("http://localhost:4000/blogs");

    if (error) return <p>{error}</p>;

    return (
        <div className="section">
            {isLoading ? <Spinner /> : <BlogList blogs={blogs as Data[]} />}
        </div>
    );
};

export default Blog;
