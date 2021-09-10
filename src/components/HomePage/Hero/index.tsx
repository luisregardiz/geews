import { PencilAltIcon, UserAddIcon, UserIcon } from "@heroicons/react/outline";
import { Link } from "react-router-dom";
import HomeBG from "../../../images/homepage.svg";
import GoogleIcon from "../../../images/google.svg";
import { FC } from "react";
import { useAuth } from "../../../hooks/useAuth";

interface HeroProps {}

const Hero: FC<HeroProps> = () => {
    const { isLogged } = useAuth();
    return (
        <div className="section min-h-screen mt-10 ">
            <div className=" flex flex-col md:flex-row w-full items-center justify-between md:space-y-0 space-y-10 my-5">
                <div>
                    <img src={HomeBG} alt="Home" className="object-contain " />
                </div>
                <div className=" bg-yellow-400 w-full md:w-1/2  rounded-xl shadow-xl p-10 flex  flex-col justify-center items-center  space-y-10">
                    <div className="flex flex-col space-y-4 z-10 ">
                        <h1 className="font-black text-5xl">
                            Welcome to Geews
                        </h1>
                        <h4 className=" text-xl  ">
                            Create an account and
                            <span className="font-black text-2xl ml-2">
                                start posting the information you want.
                            </span>
                        </h4>
                    </div>
                    <div className="flex flex-col  space-y-2">
                        {isLogged ? (
                            <>
                                <Link to="/create">
                                    <button className="btn bg-black text-white w-full">
                                        Create a post
                                        <PencilAltIcon className="w-5 ml-2" />
                                    </button>
                                </Link>
                                <Link to="/account">
                                    <button className="btn bg-blue-600  text-white w-full">
                                        My account
                                        <UserIcon className="w-5 ml-2" />
                                    </button>
                                </Link>
                            </>
                        ) : (
                            <>
                                <Link to="/signup">
                                    <button className="btn bg-black text-white w-full">
                                        Join
                                        <UserAddIcon className="w-5 ml-2" />
                                    </button>
                                </Link>
                                <button className="btn bg-blue-600  text-white ">
                                    Sign in with Google
                                    <img
                                        src={GoogleIcon}
                                        alt="Google"
                                        className="ml-2"
                                    />
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hero;
