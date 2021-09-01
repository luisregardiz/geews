import { FC } from "react";
import { useParams } from "react-router-dom";

export interface ProfileProps {}
type Params = {
    user_id: string;
};

const Profile: FC<ProfileProps> = () => {
    const { user_id } = useParams<Params>();
    

    return (
        <div>
            <h1>Profile</h1>
            <p>{user_id}</p>
        </div>
    );
};

export default Profile;
