import { FC } from "react";
import { useParams } from "react-router-dom";
import useSWR from "swr";
import BlogContent from "../../../components/Post";
import NavBlog from "../../../components/NavBlog";
import Spinner from "../../../components/Spinner";
import { fetcherPost } from "../../../helpers/fetcherpost";
import { Posts } from "../../../interfaces";

interface BlogDetailProps {}

type Params = {
    id: string;
};

const BlogDetail: FC<BlogDetailProps> = () => {
    const { id } = useParams<Params>();

    const { data, error } = useSWR(
        `${process.env.REACT_APP_SUPABASE_URL}/rest/v1/posts?id=eq.${id}`,
        fetcherPost
    );

    if (error) <p>Opss sorry: {error.message}</p>;

    if (!data) return <Spinner />;

    return (
        <div className="section">
            <div className="grid grid-flow-col lg:grid-cols-4 grid-cols-1 gap-5 place-content-center px-5  ">
                {data?.map((post) => (
                    <BlogContent key={post.id} post={post as Posts} />
                ))}

                <NavBlog />
            </div>
        </div>
    );
};

export default BlogDetail;
