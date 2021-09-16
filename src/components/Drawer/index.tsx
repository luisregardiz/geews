import { CogIcon, NewspaperIcon, PlusIcon } from "@heroicons/react/outline";
import { AnimatePresence, motion } from "framer-motion";
import { FC } from "react";
import { Link } from "react-router-dom";
import Categories from "./Categories";
export interface DrawerProps {
    handleOpenDrawer: () => void;
    isLogged: boolean;
    open: boolean;
}

export const bgDrawerVariants = {
    hidden: {
        opacity: 0,
    },
    visible: {
        opacity: 1,
        transition: {
            duration: 0.2,
            type: "tween",
        },
    },
};

const drawerVariants = {
    hidden: {
        opacity: 0,
        x: "100vw",
        transition: {
            duration: 0.3,
        },
    },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            type: "tween",
            duration: 0.3,
        },
    },
};

const Drawer: FC<DrawerProps> = ({ handleOpenDrawer, isLogged, open }) => {
    return (
        <AnimatePresence>
            {open && (
                <motion.div
                    className="bg-black w-full h-full min-h-screen absolute top-0 left-0 bg-opacity-20 z-30 flex items-end justify-end "
                    onClick={handleOpenDrawer}
                    variants={bgDrawerVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                >
                    <motion.div
                        className="bg-yellow-400 h-full min-h-screen md:w-1/4 w-4/5  shadow-xl cursor-auto z-10 overflow-y-scroll drawer"
                        variants={drawerVariants}
                    >
                        <div className="flex flex-col w-full h-full text-lg  p-5 mt-10 ">
                            <h4 className="text-2xl font-black text-yellow-700 my-2 px-4">
                                Blog
                            </h4>
                            <Link
                                to="/posts"
                                className="items-drawer px-4 font-bold flex items-center "
                            >
                                Posts <NewspaperIcon className="w-5 ml-1" />
                            </Link>
                            <Categories />
                            {isLogged && (
                                <>
                                    <Link
                                        to="/create"
                                        className="items-drawer px-4  font-bold flex items-center"
                                    >
                                        Create new post
                                        <PlusIcon className="w-5 ml-1" />
                                    </Link>
                                    <h4 className="text-2xl font-black text-yellow-700 mb-2 mt-5 px-4">
                                        User
                                    </h4>
                                    <Link
                                        to="/account/settings"
                                        className="items-drawer px-4  font-bold flex items-center "
                                    >
                                        Settings
                                        <CogIcon className="w-5 ml-1" />
                                    </Link>
                                </>
                            )}
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Drawer;
