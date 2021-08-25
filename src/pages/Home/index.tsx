import { Link } from "react-router-dom";
import HomeBG from "../../images/home.svg";

const Home = () => {
    return (
        <div className="section h-screen flex justify-center items-center ">
            <div className=" flex flex-col  items-center space-x-5 ">
                <img src={HomeBG} alt="bg-home" className="w-full" />
                <div className="flex flex-col items-center justify-center space-y-6">
                    <h1 className="text-7xl font-black uppercase text-yellow-400">
                        Geek Blog
                    </h1>
                    <Link to="/blog">
                        <button className="btn-home">Show Blog</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Home;
