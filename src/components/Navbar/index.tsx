import { MenuIcon, NewspaperIcon, XIcon } from "@heroicons/react/outline";
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
    const { setUserData } = useContext(UserContext);
    const { isLogged } = useAuth();
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

            <Avatar isLogged={isLogged} handleLogout={handleLogout} />

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
