import { FC, useContext, useState } from "react";
import LoginForm from "../../components/LoginForm";
import { User } from "../../interfaces";
import { supabase } from "../../supabaseClient";
import { useHistory } from "react-router-dom";
import toast from "react-hot-toast";
import { UserContext } from "../../context/UserContext";

export interface LoginProps {}

const Login: FC<LoginProps> = () => {
    const history = useHistory();
    const [error, setError] = useState(false);
    const { setUserData } = useContext(UserContext);
    const loginUser = async (login: User) => {
        try {
            const { user, error } = await supabase.auth.signIn(login);
            if (error) {
                console.log(error);
                setError(true);
                toast.error(error.message);
                return;
            }
            if (!user) return;
            toast.success("Welcome");
            setUserData(user);
            history.push("/blog");
        } catch (error) {
            console.log(error);
            setError(true);
        }
    };

    return (
        <div className="section min-h-screen">
            <LoginForm loginUser={loginUser} error={error} />
        </div>
    );
};

export default Login;
