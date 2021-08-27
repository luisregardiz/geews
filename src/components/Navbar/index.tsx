import {
    MenuIcon,
    NewspaperIcon,
    UserIcon,
    XIcon,
} from "@heroicons/react/outline";
import { User } from "@supabase/supabase-js";
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useHistory } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import { useAuth } from "../../hooks/useAuth";
import { useScrollBlock } from "../../hooks/useScrollBlock";
import { supabase } from "../../supabaseClient";
import Avatar from "../Avatar";
import Drawer from "../Drawer";

const Navbar = () => {
    const [open, setOpen] = useState(false);
    const [blockScroll, allowScroll] = useScrollBlock();
    const { userData, setUserData } = useContext(UserContext);
    const { isLogged } = useAuth(userData);
    const history = useHistory();

    const handleOpenDrawer = () => {
        setOpen((prev) => !prev);
    };

    const handleLogout = async () => {
        try {
            const { error } = await supabase.auth.signOut();
            if (error) return toast.error(error.message);
            setUserData({} as User);
            toast.success("See you later");
            history.push("/");
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        open ? blockScroll() : allowScroll();
    }, [allowScroll, blockScroll, open]);

    return (
        <div className="flex py-4 px-5 items-center  ">
            <div className="flex-1 px-2 mx-2">
                <Link to="/">
                    <span className="text-lg font-black uppercase flex items-center ">
                        <NewspaperIcon className="w-6 mr-2" />
                        Geews
                    </span>
                </Link>
            </div>
            <div className="flex items-center space-x-4 mr-4">
                {!isLogged && (
                    <div className="flex space-x-4">
                        <Link to="/login">
                            <button className="btn-nav">
                                Login <UserIcon className="w-4 ml-1" />
                            </button>
                        </Link>
                        <Link to="/signup">
                            <button className="btn-nav">Sign up</button>
                        </Link>
                    </div>
                )}
                {isLogged && (
                    <div className="flex mr-2 space-x-4">
                        <button className="btn-nav" onClick={handleLogout}>
                            Logout
                        </button>
                        <Avatar email={userData.email as string} />
                    </div>
                )}
            </div>

            <div className="flex-none z-40 ">
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
            {open && (
                <Drawer
                    handleOpenDrawer={handleOpenDrawer}
                    isLogged={isLogged}
                />
            )}
        </div>
    );
};

export default Navbar;
