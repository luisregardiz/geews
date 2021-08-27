import { HomeIcon } from "@heroicons/react/outline";
import { FC } from "react";
import { Link } from "react-router-dom";
import ErrorImage from "../../images/404.svg";

export interface ErrorProps {}

const Error: FC<ErrorProps> = () => {
    return (
        <div className="flex items-center justify-center h-scren flex-col ">
            <img src={ErrorImage} alt="error_image" />
            <div className="flex flex-col items-center space-y-3">
                <h1 className="text-4xl font-black ">
                    Sorry this page not found
                </h1>
                <span>Go to home</span>
                <Link to="/">
                    <button className="btn-login flex">
                        <HomeIcon className="w-6" />
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default Error;
