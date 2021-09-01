import { FC } from "react";
import { useParams } from "react-router-dom";
import useSWR from "swr";
import PostContent from "../../../components/Post";
import NavBlog from "../../../components/NavBlog";
import { fetcherPost } from "../../../helpers/fetcherpost";
import { Posts } from "../../../interfaces";
import Loader from "../../../components/Loader";
import NetworkError from "../../../components/Error/NetworkError";

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

    if (error)
        return (
            <div className="min-h-screen">
                {error.message === "Network Error" && <NetworkError />}
            </div>
        );

    if (!data) return <Loader />;

    return (
        <div className="section">
            <div className="grid grid-flow-col lg:grid-cols-4 grid-cols-1 gap-5 place-content-center px-5  ">
                {data?.map((post) => (
                    <PostContent key={post.id} post={post as Posts} />
                ))}

                <NavBlog />
            </div>
        </div>
    );
};

export default BlogDetail;
