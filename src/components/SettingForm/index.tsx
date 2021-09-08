import { FC, useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContext";
import { useAuth } from "../../hooks/useAuth";
import { BlogFormEvent, SubmitType, UserInfo } from "../../interfaces";
import Loader from "../Loader";
import Form from "./Form";

export interface SettingsFormProps {
    updateUserInfo: (userInfo: UserInfo) => void;
}

const SettingsForm: FC<SettingsFormProps> = ({ updateUserInfo }) => {
    const { userData } = useContext(UserContext);
    const { isLogged } = useAuth();
    const [isProvider, setIsProvider] = useState(false);

    useEffect(() => {
        if (Object.entries(userData).length > 1) {
            const initialValues: UserInfo = {
                user_id: userData.id,
                fname: userData.user_metadata.full_name,
                email: userData.email,
                password: "",
                instagram: userData.user_metadata.instagram_url,
                twitter: userData.user_metadata.twitter_url,
                facebook: userData.user_metadata.facebook_url,
                bio: userData.user_metadata.biography,
            };
            return setUpdateUser(initialValues);
        }
    }, [userData]);
    const initialValues: UserInfo = {
        user_id: "",
        fname: "",
        email: "",
        password: "",
        instagram: "",
        twitter: "",
        facebook: "",
        bio: "",
    };

    const [updateUser, setUpdateUser] = useState<UserInfo>(initialValues);

    useEffect(() => {
        const isProvider = userData?.app_metadata?.provider;
        if (isProvider === undefined) return setIsProvider(true);
        if (isProvider === "email") return setIsProvider(false);
        return setIsProvider(true);
    }, [userData?.app_metadata?.provider]);

    const handleChange = (ev: BlogFormEvent) => {
        const { name, value } = ev.target;
        setUpdateUser((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (ev: SubmitType) => {
        ev.preventDefault();
        updateUserInfo(updateUser);
    };
    if (!isLogged) return <Loader />;
    return (
        <>
            <Form
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                updateUser={updateUser}
                isProvider={isProvider}
            />
        </>
    );
};

export default SettingsForm;
