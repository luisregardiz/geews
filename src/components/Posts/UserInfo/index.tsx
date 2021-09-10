import { User } from "@supabase/gotrue-js";
import { FC } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { useProfile } from "../../../hooks/useProfile";
interface UserInfoProps {
    user_id: string;
    userData: User;
}
const UserInfo: FC<UserInfoProps> = ({ user_id, userData }) => {
    const { userInfo, error } = useProfile(user_id);
    const user = userInfo?.find((user) => user);

    if (error) toast.error(error);

    return (
        <div className="flex items-center space-x-2">
            <div>
                <Link
                    to={
                        userData?.id === user_id
                            ? "/account"
                            : `/profile/${user_id}`
                    }
                    className=" text-sm font-bold capitalize hover:underline text-gray-500"
                >
                    {user?.full_name}
                </Link>
            </div>
        </div>
    );
};

export default UserInfo;
