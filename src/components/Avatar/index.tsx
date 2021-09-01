import { LogoutIcon, UserIcon } from "@heroicons/react/outline";
import { FC, useContext, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../context/UserContext";

export interface AvatarProps {
    isLogged: boolean;
    handleLogout: () => void;
}

const Avatar: FC<AvatarProps> = ({ isLogged, handleLogout }) => {
    const { userData } = useContext(UserContext);
    const avatarUser = () => {
        const letter = userData.email?.charAt(0);
        if (userData?.user_metadata?.avatar_url === undefined) {
            return (
                <span className="uppercase font-black text-lg">{letter}</span>
            );
        }

        if (userData?.user_metadata?.avatar_url) {
            return (
                <img
                    src={userData.user_metadata.avatar_url}
                    alt={userData.user_metadata.full_name}
                    className="object-cover rounded-full"
                />
            );
        }
    };
    const [open, setOpen] = useState(false);
    return (
        <div className="flex flex-col items-center mr-4 ">
            <div
                onClick={() => setOpen((prev) => !prev)}
                className="bg-yellow-400 w-12 h-12 flex items-center justify-center rounded-full  border-2 border-black"
            >
                <div className="">
                    {isLogged ? avatarUser() : <UserIcon className="w-6" />}
                </div>
            </div>
            {open && (
                <div
                    onClick={() => setOpen((prev) => !prev)}
                    className="bg-black flex flex-col p-6 text-yellow-400 absolute top-20 rounded-lg items-center border-t-8 border-yellow-400 space-y-2 font-bold shadow-xl z-20"
                >
                    {isLogged ? (
                        <div className="flex flex-col items-center space-y-4">
                            <Link to="/account" className="flex items-center">
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
                </div>
            )}
        </div>
    );
};

export default Avatar;
