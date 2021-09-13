import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/outline";
import { AnimatePresence, motion } from "framer-motion";
import { FC, useState } from "react";
import { Link } from "react-router-dom";
import { categories } from "../../../helpers/categories";

interface CategoriesProps {}
type EventButton = React.MouseEvent<HTMLButtonElement, MouseEvent>;

const collapsibleVariants = {
    hidden: {
        height: 0,
        opacity: 0,
    },
    visible: {
        height: "auto",
        opacity: 1,
        transition: {
            duration: 0.3,
        },
    },
    exit: {
        height: 0,
        opacity: 0,
        transition: {
            duration: 0.1,
        },
    },
};

const Categories: FC<CategoriesProps> = () => {
    const [isOpen, setOpen] = useState(false);
    const handleOpen = (ev: EventButton) => {
        ev.stopPropagation();
        setOpen((prev) => !prev);
    };
    return (
        <>
            <button
                onClick={(ev) => handleOpen(ev)}
                className="items-drawer px-4 font-bold flex items-center"
            >
                Categories
                {isOpen ? (
                    <ChevronUpIcon className="w-6 ml-1" />
                ) : (
                    <ChevronDownIcon className="w-6 ml-1" />
                )}
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className="flex flex-col px-4 z-0 bg-yellow-300 p-4 rounded-xl my-2 "
                        variants={collapsibleVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                    >
                        {categories.map((category) => (
                            <Link key={category} to={`/posts/${category}`}>
                                <button className="capitalize py-1 px-4 items-drawer  text-left ">
                                    {category}
                                </button>
                            </Link>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Categories;
