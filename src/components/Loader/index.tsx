import { FC } from "react";
import "./Loader.css";

export interface LoaderProps {}

const Loader: FC<LoaderProps> = () => {
    return (
        <div className="bg-white w-full h-screen top-0 right-0 flex justify-center items-center z-50">
            <div className="cssload-loader"></div>
        </div>
    );
};

export default Loader;
