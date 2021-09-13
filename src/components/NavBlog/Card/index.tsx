import { FC } from "react";
import { Link } from "react-router-dom";
import { colorCategory } from "../../../helpers/colorCategory";
import { useRecentPost } from "../../../hooks/useRecentPost";
import { Posts } from "../../../interfaces";

interface NavCardProps {
    posts: Posts[];
}

const NavCard: FC<NavCardProps> = ({ posts }) => {
    const { recentPost } = useRecentPost(posts as Posts[], 5);

    return (
        <div className="space-y-5 p-2">
            {recentPost?.map(({ id, title, category, image }) => (
                <div
                    key={id}
                    className={`bg-white flex items-center  rounded-xl  space-x-4 shadow-xl border-r-4 border-${colorCategory(
                        category
                    )}`}
                >
                    <div className="h-full w-1/2 ">
                        <img
                            src={image}
                            alt={title}
                            className="object-cover h-full rounded-l-xl"
                        />
                    </div>
                    <div className="p-2 w-1/2">
                        <Link to={`/post/${id}`}>
                            <p className="text-sm hover:underline">
                                {title.slice(0, 30)}...
                            </p>
                        </Link>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default NavCard;
