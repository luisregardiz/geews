import { FC } from "react";

interface NavBlogProps {}

const NavBlog: FC<NavBlogProps> = () => {
    return (
        <div className="bg-black rounded-lg h-screen w-full p-4 hidden flex-col justify-center items-center sticky top-0 mt-10 z-0 lg:flex">
            <h1 className="text-4xl font-black text-yellow-400">Blogs</h1>
        </div>
    );
};

export default NavBlog;
