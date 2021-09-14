import { FC, useContext } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { UserContext } from "../../../context/UserContext";
import { useProfile } from "../../../hooks/useProfile";
interface UserInfoProps {
    user_id: string;
}
const UserInfo: FC<UserInfoProps> = ({ user_id }) => {
    const { userData } = useContext(UserContext);
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
