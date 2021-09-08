import { User } from "@supabase/gotrue-js";
import { FC } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { useAvatar } from "../../../hooks/useAvatar";
import { useProfile } from "../../../hooks/useProfile";
import Spinner from "../../Spinner";
interface UserInfoProps {
    user_id: string;
    userData: User;
}
const UserInfo: FC<UserInfoProps> = ({ user_id, userData }) => {
    const { userInfo, loading, error } = useProfile(user_id);
    const user = userInfo?.find((user) => user);
    const { avatarUrl } = useAvatar(user?.avatar_url as string);

    if (loading) return <Spinner />;
    if (error) toast.error(error);

    return (
        <div className="flex  items-center space-x-5 self-start  rounded-md shadow-xl px-5 py-3 border-t-2 border-yellow-400">
            <div className="w-12 h-12 rounded-full bg-black flex items-center justify-center shadow-lg ">
                {avatarUrl && (
                    <img
                        src={avatarUrl}
                        alt={user?.full_name}
                        className="w-12 h-12 rounded-full object-cover"
                    />
                )}
            </div>
            <div className="flex flex-col">
                <Link
                    to={
                        userData?.id === user_id
                            ? "/account"
                            : `/profile/${user_id}`
                    }
                    className="text-xl font-bold capitalize hover:underline"
                >
                    {user?.full_name}
                </Link>
                <span className=" italic">Blogger | Geek</span>
            </div>
        </div>
    );
};

export default UserInfo;
