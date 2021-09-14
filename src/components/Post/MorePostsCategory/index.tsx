import { FC } from "react";
import useSWR from "swr";
import { fetcherPosts } from "../../../helpers/fetcherposts";
import Spinner from "../../Spinner";
import UserInfo from "../../Posts/UserInfo";
import { dateFormated } from "../../../helpers/dateFormated";
import { Link } from "react-router-dom";

interface MorePostCategoryProps {
    category: string;
    post_id: number;
}

const MorePostCategory: FC<MorePostCategoryProps> = ({ category, post_id }) => {
    const { data, error } = useSWR(
        `${process.env.REACT_APP_SUPABASE_URL}/rest/v1/posts?category=eq.${category}&limit=5`,
        fetcherPosts
    );
    return (
        <div className="my-5">
            <div>
                <h1 className="text-4xl font-black">More {category} posts</h1>
            </div>
            {data !== undefined && data.length < 2 ? (
                <h4 className="my-5">No more {category} posts</h4>
            ) : (
                <div className="blog-list my-5">
                    {!data && <Spinner />}

                    {error && <p>Oppps {error.message}</p>}
                    {data?.map(({ id, title, image, user_id, created_at }) => {
                        return (
                            post_id !== id && (
                                <div
                                    key={id}
                                    className="rounded-lg shadow-lg p-4 space-y-4 cursor-pointer hover:opacity-90"
                                >
                                    <Link
                                        to={`/post/${id}`}
                                        className="space-y-3"
                                    >
                                        <img
                                            src={image}
                                            alt={title}
                                            className="rounded-lg h-48 w-full object-cover"
                                        />
                                        <h4 className="text-xl font-bold">
                                            {title}
                                        </h4>
                                    </Link>
                                    <div>
                                        <UserInfo user_id={user_id} />
                                        <span className="text-sm font-bold text-gray-600">
                                            {dateFormated(created_at as string)}
                                        </span>
                                    </div>
                                </div>
                            )
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default MorePostCategory;
