import {
    CheckCircleIcon,
    CogIcon,
    UserIcon,
    XCircleIcon,
} from "@heroicons/react/outline";
import { FC, useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import { createDate } from "../../helpers/createDate";
import { useAuth } from "../../hooks/useAuth";
import { useAvatar } from "../../hooks/useAvatar";
import Spinner from "../Spinner";

export interface UserAccountProps {}

const UserAccount: FC<UserAccountProps> = () => {
    const { userData } = useContext(UserContext);
    const { isLogged } = useAuth();
    const customId = userData?.id?.slice(0, 6);
    const username = userData?.user_metadata?.full_name || `Geek_${customId}`;
    const userAvatar = userData.user_metadata?.avatar_url;

    const { avatarUrl } = useAvatar(userAvatar);

    const avatarUser = () => {
        if (avatarUrl) {
            return (
                <img
                    src={avatarUrl}
                    alt="avatar"
                    className="rounded-full object-cover w-24 h-24"
                />
            );
        }

        return <UserIcon className="w-8" />;
    };
    if (!isLogged) return <Spinner />;

    return (
        <div>
            <div className="user-info">
                <div>
                    <div className="bg-black rounded-full flex items-center justify-center text-5xl font-bold text-yellow-400  w-24 h-24">
                        {avatarUser()}
                    </div>
                </div>
                <div className="flex flex-col md:pl-5  space-y-4 ">
                    <div>
                        <span className="uppercase font-black text-gray-300 text-xs">
                            Name:
                        </span>
                        <p className="text-lg">{username}</p>
                    </div>
                    <div>
                        <span className="uppercase font-black text-gray-300 text-xs">
                            Email:
                        </span>
                        <p className="text-lg">{userData?.email}</p>
                    </div>
                </div>
                <div className="flex flex-col md:pl-5 space-y-4 ">
                    <div>
                        <span className="uppercase font-black text-gray-300 text-xs">
                            Account created:
                        </span>
                        <p className="text-lg">
                            {createDate(userData?.confirmed_at as string)}
                        </p>
                    </div>
                    <div>
                        <span className="uppercase font-black text-gray-300 text-xs">
                            Account authenticated:
                        </span>
                        {userData?.aud === "authenticated" ? (
                            <p className="text-green-500 font-bold flex items-center md:justify-start justify-center">
                                Authenticated
                                <CheckCircleIcon className="w-4 ml-1" />
                            </p>
                        ) : (
                            <p className="text-red-500 font-bold flex items-center md:justify-start justify-center">
                                No authenticated
                                <XCircleIcon className="w-4 ml-1" />
                            </p>
                        )}
                    </div>
                </div>
                <div className="md:pl-5 md:mt-0 my-5">
                    <Link to="/account/settings">
                        <CogIcon className="w-6" />
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default UserAccount;
