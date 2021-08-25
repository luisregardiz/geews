import { MenuIcon, NewspaperIcon, XIcon } from "@heroicons/react/outline";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Drawer from "../Drawer";
import {disableBodyScroll, enableBodyScroll} from "body-scroll-lock"

const Navbar = () => {
    const [open, setOpen] = useState(false);

    const handleOpenDrawer = () => {
        setOpen((prev) => !prev);
    };

    useEffect(() => {
        !open ? enableBodyScroll(document.body) : disableBodyScroll(document.body)
    }, [open])

    return (
        <div className="flex  shadow bg-yellow-400 text-gray-800 py-4 px-5 items-center  ">
            <div className="flex-1 px-2 mx-2">
                <Link to="/">
                    <span className="text-lg font-black uppercase flex ">
                        <NewspaperIcon className="w-6 mr-2"/>
                        Geews
                        </span>
                </Link>
            </div>

            <div className="flex-none z-30 ">
                <button
                    className="hover:bg-black hover:bg-opacity-10 p-1.5 rounded-full"
                    onClick={handleOpenDrawer}
                >
                    {open ? (
                        <XIcon className="w-8 font-weight" />
                    ) : (
                        <MenuIcon className="w-8 font-weight" />
                    )}
                </button>
            </div>
            {open && <Drawer handleOpenDrawer={handleOpenDrawer} />}
        </div>
    );
};

export default Navbar;
