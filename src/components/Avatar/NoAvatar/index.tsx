import { FC } from "react";

interface NoAvatarProps {
    name: string;
    size: number;
    color: string;
}

const NoAvatar: FC<NoAvatarProps> = ({ name, size, color }) => {
    const firstLetter = name?.charAt(0);
    return (
        <div
            className={`${
                color === "yellow"
                    ? "bg-yellow-400 text-black"
                    : " bg-black text-yellow-400"
            } rounded-full shadow-lg flex items-center justify-center h-${size} w-${size} ${
                size >= 24 ? "text-4xl" : "text-base"
            }  font-black `}
        >
            <span> {firstLetter}</span>
        </div>
    );
};

export default NoAvatar;
