import { TrashIcon } from "@heroicons/react/outline";
import { FC } from "react";
import { Data } from "../../interfaces";

interface BlogContentProps {
    blog: Data;
    handleDeleteBlog: () => Promise<void>;
}

const BlogContent: FC<BlogContentProps> = ({ blog, handleDeleteBlog}) => {
    const { title, body, image, author } = blog;
    const letter = author?.charAt(0);
    return (
        <article className="col-span-3 flex flex-col items-center space-y-5 my-10 ">
            <h1 className="text-5xl font-black uppercase  mb-5 ">
                {title}
            </h1>
            <img
                src={image}
                alt={title}
                className="object-cover md:w-4/5 w-full h-3/6 rounded-lg shadow-lg self-center"
            />
                <div className="flex  items-center space-x-5 self-start  rounded-md shadow-xl px-5 py-3 border-t-2 border-yellow-400">
                    <div className="w-12 h-12 rounded-full bg-black flex items-center justify-center shadow-lg ">
                        <span className="text-yellow-400 font-black text-2xl capitalize">
                            {letter}
                        </span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-xl font-bold capitalize">{author}</span>
                        <span className=" italic">Blogger | Geek</span>
                    </div>
                </div>
                <p className="md:max-w-screen-md w-auto leading-relaxed border-t-2 text-lg py-4">{body}</p>
                <button className="self-start bg-red-500 hover:bg-red-600 text-white rounded-lg  p-4 flex items-center shadow-lg  " onClick={handleDeleteBlog}> Delete Blog <TrashIcon className="w-6 ml-2"/> </button>
        </article>
    );
};

export default BlogContent;
