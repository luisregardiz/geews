import { LogoutIcon, UserIcon } from "@heroicons/react/outline";
import { AnimatePresence, motion } from "framer-motion";
import { FC, useContext, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../../context/UserContext";
import { useAvatar } from "../../../hooks/useAvatar";

export interface UserNavProps {
    isLogged: boolean;
    handleLogout: () => void;
}

const UserNav: FC<UserNavProps> = ({ isLogged, handleLogout }) => {
    const [open, setOpen] = useState(false);
    const { userData } = useContext(UserContext);
    const userAvatar = userData.user_metadata?.avatar_url;

    const { avatarUrl } = useAvatar(userAvatar);

    const avatarUser = () => {
        if (avatarUrl) {
            return (
                <img
                    src={avatarUrl}
                    alt="avatar"
                    className="rounded-full w-12 h-12 object-cover"
                />
            );
        }

        return <UserIcon className="w-6" />;
    };

    return (
        <div className="flex flex-col items-center mr-4 ">
            <div
                onClick={() => setOpen((prev) => !prev)}
                className="bg-yellow-400 w-12 h-12 flex items-center justify-center rounded-full shadow-md cursor-pointer"
            >
                <div>
                    {isLogged ? avatarUser() : <UserIcon className="w-6" />}
                </div>
            </div>
            <AnimatePresence>
                {open && (
                    <motion.div
                        onClick={() => setOpen((prev) => !prev)}
                        className="bg-black flex flex-col p-6 text-yellow-400 absolute top-20 right-20 rounded-lg items-center border-t-8 border-yellow-400 space-y-2 font-bold shadow-xl z-20 s"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ type: "spring", stiffness: 140 }}
                    >
                        {isLogged ? (
                            <div className="flex flex-col items-center space-y-4">
                                <Link
                                    to="/account"
                                    className="flex items-center"
                                >
                                    Account <UserIcon className="w-4 ml-1" />
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="btn-nav flex items-center"
                                >
                                    Logout <LogoutIcon className="w-4 ml-1" />
                                </button>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center space-y-4">
                                <Link
                                    to="/login"
                                    className="flex items-center font-bold text-lg"
                                >
                                    Login <UserIcon className="w-4 ml-1" />
                                </Link>

                                <button className="btn-nav">
                                    <Link to="/signup">Sign Up </Link>
                                </button>
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default UserNav;
