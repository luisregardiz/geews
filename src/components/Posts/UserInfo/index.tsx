import { User } from "@supabase/gotrue-js";
import { FC } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { useAvatar } from "../../../hooks/useAvatar";
import { useProfile } from "../../../hooks/useProfile";
interface UserInfoProps {
    user_id: string;
    userData: User;
}
const UserInfo: FC<UserInfoProps> = ({ user_id, userData }) => {
    const { userInfo, error } = useProfile(user_id);
    const user = userInfo?.find((user) => user);
    const { avatarUrl } = useAvatar(user?.avatar_url as string);

    if (error) toast.error(error);

    return (
        <div className="flex items-center space-x-2">
            <div className=" ">
                {avatarUrl && (
                    <img
                        src={avatarUrl}
                        alt={user?.full_name}
                        className="w-6 h-6 rounded-full object-cover"
                    />
                )}
            </div>
            <div>
                <Link
                    to={
                        userData?.id === user_id
                            ? "/account"
                            : `/profile/${user_id}`
                    }
                    className=" text-sm font-bold capitalize hover:underline"
                >
                    {user?.full_name}
                </Link>
            </div>
        </div>
    );
};

export default UserInfo;
