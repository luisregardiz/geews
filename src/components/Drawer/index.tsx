import { CogIcon, NewspaperIcon, PlusIcon } from "@heroicons/react/outline";
import { AnimatePresence, motion } from "framer-motion";
import { FC } from "react";
import { Link } from "react-router-dom";
export interface DrawerProps {
    handleOpenDrawer: () => void;
    isLogged: boolean;
    open: boolean;
}

const bgDrawerVariants = {
    hidden: {
        opacity: 0,
    },
    visible: {
        opacity: 1,
        transition: {
            duration: 0.3,
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
                    className="bg-black w-full h-full min-h-screen absolute top-0 left-0 bg-opacity-20 z-30 "
                    onClick={handleOpenDrawer}
                    variants={bgDrawerVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                >
                    <motion.div
                        className="bg-yellow-400 h-full min-h-screen md:w-1/4 w-4/5 absolute top-0 right-0 shadow-xl cursor-auto z-0"
                        variants={drawerVariants}
                    >
                        <div className="flex flex-col w-full h-full text-lg uppercase   p-5 mt-12  ">
                            <h4 className="text-2xl font-black text-yellow-700 my-2 px-4">
                                Blog
                            </h4>
                            <Link
                                to="/blog"
                                className="items-drawer px-4  font-black flex items-center "
                            >
                                Posts <NewspaperIcon className="w-5 ml-1" />
                            </Link>
                            {isLogged && (
                                <>
                                    <Link
                                        to="/create"
                                        className="items-drawer px-4  font-black flex items-center"
                                    >
                                        Create New Post
                                        <PlusIcon className="w-5 ml-1" />
                                    </Link>
                                    <h4 className="text-2xl font-black text-yellow-700 mb-2 mt-5 px-4">
                                        User
                                    </h4>
                                    <Link
                                        to="/account/settings"
                                        className="items-drawer px-4  font-black flex items-center "
                                    >
                                        Settings{" "}
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
