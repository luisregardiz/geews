import { FC } from "react";
import { Link } from "react-router-dom";
import { Posts } from "../../interfaces";

export interface Props {
    blogs: Posts[];
}

const BlogList: FC<Props> = ({ blogs }) => {
    return (
        <div className="blog-list my-5 ">
            {blogs?.map(({ id, title, body, author, image }) => (
                <div
                    key={id}
                    className="rounded-lg shadow-lg p-4 md:first:col-span-2 "
                >
                    <Link to={`/blog/${id}`}>
                        <img
                            src={image}
                            alt={title}
                            className="h-48 w-full object-cover rounded-lg mb-2"
                        />
                        <h2 className="text-xl font-bold ">{title}</h2>
                        <p className="my-2 truncate">{body}</p>
                    </Link>

                    <span className="italic text-sm font-bold flex capitalize">
                        -{author}
                    </span>
                </div>
            ))}
        </div>
    );
};

export default BlogList;
