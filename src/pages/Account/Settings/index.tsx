import { FC, useContext, useState } from "react";
import toast from "react-hot-toast";
import { useHistory } from "react-router";
import Avatar from "../../../components/Avatar";
import SettingsForm from "../../../components/SettingForm";
import { UserContext } from "../../../context/UserContext";
import { UserInfo } from "../../../interfaces";
import { supabase } from "../../../supabaseClient";

export interface AccountSettingsProps {}

const AccountSettings: FC<AccountSettingsProps> = () => {
    const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
    const { userData } = useContext(UserContext);
    const history = useHistory();
    const userAvatar = () => {
        const avatarProvider = userData?.user_metadata?.avatar_url;
        const verifyAvatarProvider = avatarProvider?.includes("https://");
        if (verifyAvatarProvider) return "";
        return userData?.user_metadata?.avatar_url;
    };

    const updateUserInfo = async (userInfo: UserInfo) => {
        const infoUpdate = await supabase.from("profiles").insert(
            [
                {
                    user_id: userInfo.user_id,
                    full_name:
                        userInfo.fname || userData.user_metadata.full_name,
                    instagram_url: userInfo.instagram,
                    twitter_url: userInfo.twitter,
                    facebook_url: userInfo.facebook,
                    biography: userInfo.bio,
                    avatar_url: avatarUrl || userAvatar(),
                },
            ],
            { upsert: true }
        );
        const dataUpdate = await supabase.auth.update({
            email: userInfo.email,
            password: userInfo.password,
            data: {
                full_name: userInfo.fname,
                instagram_url: userInfo.instagram,
                twitter_url: userInfo.twitter,
                facebook_url: userInfo.facebook,
                biography: userInfo.bio,
                avatar_url: avatarUrl || userAvatar(),
            },
        });

        const [{ user, error }, { data, error: dataError }] = await Promise.all(
            [dataUpdate, infoUpdate]
        );

        if (error && dataError)
            return toast.error(error.message || dataError.message);
        if (data && user) {
            toast.success("Your information has been updated");
            setTimeout(() => {
                history.go(0);
            }, 1000);
        }
    };

    return (
        <div className="flex flex-col items-center mb-10">
            <div>
                <Avatar
                    url={avatarUrl as string}
                    onUpload={(url) => {
                        setAvatarUrl(url);
                    }}
                />
            </div>
            <SettingsForm updateUserInfo={updateUserInfo} />
        </div>
    );
};

export default AccountSettings;
