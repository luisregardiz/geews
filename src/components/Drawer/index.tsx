import { FC } from "react";
import { Link } from "react-router-dom";

export interface DrawerProps {
    handleOpenDrawer: () => void;
}

const Drawer: FC<DrawerProps> = ({ handleOpenDrawer }) => {

    return (
        <div
            className="bg-black w-full h-full absolute top-0 left-0 bg-opacity-20 z-20"
            onClick={handleOpenDrawer}
        >
            <div className="bg-yellow-400 h-full md:w-1/4 w-4/5 absolute top-0 right-0 shadow-xl cursor-auto z-0">
                <div className="flex flex-col w-full h-full text-xl  p-5 mt-12 items-center  space-y-4 ">
                    <h4 className="border-b-4 border-gray-900">Menu</h4>
                    <Link to="/blog" className="items-drawer text-center">Blog</Link>
                    <Link to="/create" className="items-drawer text-center" >Create New Blog</Link>
                    <button className="items-drawer">Popular Blogs</button>
                </div>
            </div>
        </div>
    );
};

export default Drawer;
