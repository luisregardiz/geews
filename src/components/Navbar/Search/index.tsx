import { SearchIcon } from "@heroicons/react/outline";
import { AnimatePresence, motion } from "framer-motion";
import { FC, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { useScrollBlock } from "../../../hooks/useScrollBlock";
import { InputType, Posts } from "../../../interfaces";
import { supabase } from "../../../supabaseClient";
import { bgDrawerVariants } from "../../Drawer";

interface SearchProps {}
const Search: FC<SearchProps> = () => {
    const [isOpen, setOpen] = useState(false);
    const [posts, setPosts] = useState<Posts[]>([]);
    const [blockScroll, allowScroll] = useScrollBlock();

    const handleOpen = () => {
        searchPost("");
        setOpen((prev) => !prev);
    };

    const handleSearch = (ev: InputType) => {
        const { value } = ev.target;
        searchPost(value);
    };

    const searchPost = async (input: string) => {
        try {
            const { data, error } = await supabase
                .from("posts")
                .select()
                .textSearch("title", input);
            if (!data) return;
            if (data) {
                return setPosts(data);
            }
            if (error) toast.error(error.message);
        } catch (error) {
            console.error(error);
        }
    };
    useEffect(() => {
        isOpen ? blockScroll() : allowScroll();
    }, [allowScroll, blockScroll, isOpen]);

    return (
        <div>
            <button onClick={handleOpen}>
                <SearchIcon className="w-6 mr-5" />
            </button>
            <AnimatePresence>
                {isOpen && (
                    <form onSubmit={(ev) => ev.preventDefault()}>
                        <motion.div
                            onClick={handleOpen}
                            className="w-full h-screen bg-black bg-opacity-40 absolute top-0 left-0 flex justify-center items-start pt-20 z-50"
                            variants={bgDrawerVariants}
                            initial="hidden"
                            animate="visible"
                            exit="hidden"
                        >
                            <div
                                onClick={(ev) => ev.stopPropagation()}
                                className="md:w-1/2 w-full mx-4  bg-white rounded-xl shadow-xl flex  flex-col items-center p-5 border-2 border-black"
                            >
                                <input
                                    type="text"
                                    id="search"
                                    name="search"
                                    placeholder="Search"
                                    className="w-full border-0 p-2 border-b-2 focus:ring-0 focus:border-black"
                                    onChange={(ev) => handleSearch(ev)}
                                />
                                <div className="my-5 space-y-4 w-full">
                                    {posts.length < 1 && (
                                        <p>No search results</p>
                                    )}
                                    {posts.map(({ id, title, image }) => (
                                        <Link
                                            onClick={handleOpen}
                                            to={`/post/${id}`}
                                            key={id}
                                            className="flex items-center space-x-4 p-5 shadow-lg rounded-lg border-2 border-black h-32 cursor-pointer hover:bg-black hover:text-white "
                                        >
                                            <img
                                                src={image}
                                                alt={title}
                                                className="w-1/2 h-full object-cover rounded-lg"
                                            />
                                            <p className="text-sm font-bold">
                                                {title.slice(0, 50)}...
                                            </p>
                                        </Link>
                                    ))}
                                    <span className="inline-flex text-sm ">
                                        Results: {posts.length}
                                    </span>
                                </div>
                            </div>
                        </motion.div>
                    </form>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Search;
