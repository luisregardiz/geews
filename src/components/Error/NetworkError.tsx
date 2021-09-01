import { FC } from "react";
import NetworkImage from "../../images/NetworkError.svg";

export interface NetworkErrorProps {}

const NetworkError: FC<NetworkErrorProps> = () => {
    return (
        <div className=" flex flex-col justify-center items-center mt-5">
            <img
                src={NetworkImage}
                alt="Network Error"
                className=" object-cover"
            />
            <h4 className="font-bold text-2xl">No connection</h4>
            <p>Please check your internet connection and try again</p>
        </div>
    );
};

export default NetworkError;
