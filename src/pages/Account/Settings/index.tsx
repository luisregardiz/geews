import { FC } from "react";
import toast from "react-hot-toast";
import SettingsForm from "../../../components/SettingForm";
import { UserInfo } from "../../../interfaces";
import { supabase } from "../../../supabaseClient";

export interface AccountSettingsProps {}

const AccountSettings: FC<AccountSettingsProps> = () => {
    const updateUserInfo = async (userInfo: UserInfo) => {
        const infoUpdate = await supabase.from("profiles").insert(
            [
                {
                    user_id: userInfo.user_id,
                    full_name: userInfo.fname,
                    instagram_url: userInfo.instagram,
                    twitter_url: userInfo.twitter,
                    facebook_url: userInfo.facebook,
                    biography: userInfo.bio,
                },
            ],
            { upsert: true }
        );
        const dataUpdate = await supabase.auth.update({
            data: {
                full_name: userInfo.fname,
                instagram_url: userInfo.instagram,
                twitter_url: userInfo.twitter,
                facebook_url: userInfo.facebook,
                biography: userInfo.bio,
            },
        });

        const [{ user, error }, { data, error: dataError }] = await Promise.all(
            [dataUpdate, infoUpdate]
        );

        if (error && dataError)
            return toast.error(error.message || dataError.message);
        if (data && user)
            return toast.success("Your information has been updated");
    };
    // const updateUserData = async(userInfo: UserInfo) => {

    // }
    return (
        <div className="flex flex-col items-center mb-10">
            <SettingsForm updateUserInfo={updateUserInfo} />
        </div>
    );
};

export default AccountSettings;
