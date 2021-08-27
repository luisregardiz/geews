import { FC } from "react";

export interface AvatarProps {
    email: string;
}

const Avatar: FC<AvatarProps> = ({ email }) => {
    const letter = email?.charAt(0);
    return (
        <div className="bg-yellow-400 w-12 h-12 flex items-center justify-center rounded-full  border-2 border-black">
            <span className="uppercase font-black text-xl">{letter}</span>
        </div>
    );
};

export default Avatar;
