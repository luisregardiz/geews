import { FC, useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContext";
import { BlogFormEvent, SubmitType, UserInfo } from "../../interfaces";
import Form from "./Form";

export interface SettingsFormProps {
    updateUserInfo: (userInfo: UserInfo) => void;
}

const SettingsForm: FC<SettingsFormProps> = ({ updateUserInfo }) => {
    const { userData } = useContext(UserContext);
    const [isProvider, setIsProvider] = useState(false);
    const customId = userData?.id?.slice(0, 6);
    const fullName = userData?.user_metadata?.full_name || `Geek_${customId}`;

    const initialValues: UserInfo = {
        user_id: userData.id,
        fname: fullName,
        email: userData.email,
        password: "",
        instagram: userData.user_metadata.instagram_url || "",
        twitter: userData.user_metadata.twitter_url || "",
        facebook: userData.user_metadata.facebook_url || "",
        bio: userData.user_metadata.biography || "",
    };
    const [updateUser, setUpdateUser] = useState<UserInfo>(initialValues);

    const avatarUser = () => {
        const letter = userData.email?.charAt(0);
        const avatarProvider = userData?.user_metadata?.avatar_url;
        if (avatarProvider === undefined) {
            return (
                <span className="uppercase font-black text-lg text-yellow-400">
                    {letter}
                </span>
            );
        }

        if (avatarProvider) {
            return (
                <img
                    src={avatarProvider}
                    alt={userData.user_metadata.full_name}
                    className="object-cover rounded-full"
                />
            );
        }
    };

    useEffect(() => {
        if (userData?.app_metadata?.provider === undefined)
            return setIsProvider(true);
        if (userData?.app_metadata?.provider === "email")
            return setIsProvider(false);
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
    return (
        <>
            <div className="h-28 w-28 rounded-full relative bg-black top-8 flex justify-center items-center">
                {avatarUser()}
            </div>
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
