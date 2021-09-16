import { FC } from "react";
import CreateImage from "../../../images/create.svg";
interface CreateSectionProps {}

const CreateSection: FC<CreateSectionProps> = () => {
    return (
        <div className="bg-yellow-400 h-screen flex items-center justify-center">
            <div className="bg-gray-100 p-10 rounded-lg shadow-xl mx-10">
                <div className="flex md:flex-row md:space-y-0 space-y-5 flex-col justify-around items-center">
                    <img
                        src={CreateImage}
                        alt="Create"
                        className="object-contain md:w-1/2"
                    />
                    <div className="space-y-5">
                        <h4 className="text-4xl font-black">
                            Start blogging now
                        </h4>
                        <ul className="list-disc list-inside border-2 border-gray-900 inline-flex flex-col p-4 rounded-xl shadow-md space-y-5 bg-white">
                            <li>No need to create a blog</li>
                            <li>You can share your posts</li>
                            <li>Anyone can see your posts and share them</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateSection;
