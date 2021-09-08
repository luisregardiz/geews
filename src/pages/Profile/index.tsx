import { FC } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import NetworkError from "../../components/Error/NetworkError";
import Loader from "../../components/Loader";
import UserProfile from "../../components/Profile";
import ProfilePosts from "../../components/Profile/ProfilePosts";
import { useProfile } from "../../hooks/useProfile";

export interface ProfileProps {}
type Params = {
    user_id: string;
};

const Profile: FC<ProfileProps> = () => {
    const { user_id } = useParams<Params>();

    const { userInfo, userPosts, loading, error } = useProfile(user_id);
    if (loading) return <Loader />;

    if (error) {
        toast.error(error);
        return (
            <div className="min-h-screen">
                {error === "Network Error" && <NetworkError />}
            </div>
        );
    }

    return (
        <div className="section flex md:flex-row flex-col md:space-x-3 space-y-3">
            {userInfo.map((profile) => (
                <UserProfile profile={profile} key={profile.user_id} />
            ))}
            <ProfilePosts posts={userPosts} />
        </div>
    );
};

export default Profile;
