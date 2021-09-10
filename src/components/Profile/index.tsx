import { FC } from "react";
import { useAvatar } from "../../hooks/useAvatar";
import { Profile } from "../../interfaces";
import Spinner from "../Spinner";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

export interface UserProfileProps {
    profile: Profile;
}

const UserProfile: FC<UserProfileProps> = ({ profile }) => {
    const {
        full_name,
        avatar_url,
        biography,
        facebook_url,
        instagram_url,
        twitter_url,
    } = profile;
    const { avatarUrl } = useAvatar(avatar_url);

    return (
        <div className="bg-black text-white rounded-xl shadow-xl inline-flex flex-col items-center p-10 min-w-max">
            {avatarUrl ? (
                <img
                    src={avatarUrl}
                    alt="Avatar"
                    className="w-32 h-32 object-cover rounded-full mb-5"
                />
            ) : (
                <Spinner />
            )}

            <div className="space-y-3">
                <div>
                    <span className="uppercase font-black text-gray-300 text-xs">
                        Name:
                    </span>
                    <h4>{full_name}</h4>
                    <span className="uppercase font-black text-gray-300 text-xs">
                        Biography:
                    </span>
                    <p>{biography}</p>
                </div>
                <div className="flex-1 ">
                    <span className="uppercase font-black text-gray-300 text-xs">
                        Social Network:
                    </span>
                    <div className="flex space-x-4 flex-wrap my-3">
                        {facebook_url && (
                            <a
                                href={facebook_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="font-bold text-xl"
                            >
                                <FaFacebook />
                            </a>
                        )}
                        {instagram_url && (
                            <a
                                href={instagram_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="font-bold text-xl"
                            >
                                <FaInstagram />
                            </a>
                        )}
                        {twitter_url && (
                            <a
                                href={twitter_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="font-bold text-xl"
                            >
                                <FaTwitter />
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;
