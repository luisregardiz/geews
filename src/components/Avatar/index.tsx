import { PencilAltIcon } from "@heroicons/react/outline";
import { FC, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { UserContext } from "../../context/UserContext";
import { useAvatar } from "../../hooks/useAvatar";
import { InputType } from "../../interfaces";
import { supabase } from "../../supabaseClient";
import Profile from "../../images/profile.svg";

interface AvatarProps {
    url: string;
    onUpload: (path: string) => void;
}

const Avatar: FC<AvatarProps> = ({ url, onUpload }) => {
    const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
    const [uploading, setUploading] = useState(false);
    const { userData } = useContext(UserContext);
    const userAvatar = userData.user_metadata?.avatar_url;

    const { avatarUrl: prevAvatar } = useAvatar(userAvatar);

    useEffect(() => {
        if (url) downloadImage(url);
    }, [url]);

    const downloadImage = async (path: string) => {
        try {
            const { data, error } = await supabase.storage
                .from("avatars")
                .download(path);
            if (error) {
                throw error;
            }
            const url = URL.createObjectURL(data);
            setAvatarUrl(url);
        } catch (error) {
            console.log(error);
        }
    };

    const uploadAvatar = async (event: InputType) => {
        try {
            setUploading(true);

            if (!event.target.files || event.target.files.length === 0) {
                throw new Error("You must select an image to upload.");
            }

            const file = event.target.files[0];
            const fileExt = file.name.split(".").pop();
            const fileName = `${Math.random()}.${fileExt}`;
            const filePath = `${fileName}`;

            let { error: uploadError } = await supabase.storage
                .from("avatars")
                .upload(`${userData?.id}/${filePath}`, file, {
                    cacheControl: "3600",
                    upsert: false,
                });

            if (uploadError) {
                throw uploadError;
            }
            toast.success("Image uploaded");
            onUpload(`${userData?.id}/${filePath}`);
        } catch (error) {
            alert(error);
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="flex items-center justify-center ">
            {avatarUrl ? (
                <img
                    src={avatarUrl}
                    alt="Avatar"
                    className="h-32 w-32 rounded-full object-cover  top-10 relative"
                />
            ) : (
                <img
                    src={prevAvatar || Profile}
                    alt="Avatar"
                    className="h-32 w-32 rounded-full object-cover  top-10 relative "
                />
            )}

            <div className="relative ">
                <label className="cursor-pointer" htmlFor="single">
                    {uploading ? (
                        "Uploading ..."
                    ) : (
                        <PencilAltIcon className="w-6  " />
                    )}
                </label>
                <input
                    type="file"
                    accept="image/*"
                    id="single"
                    className="absolute hidden"
                    onChange={uploadAvatar}
                    disabled={uploading}
                />
            </div>
        </div>
    );
};

export default Avatar;
