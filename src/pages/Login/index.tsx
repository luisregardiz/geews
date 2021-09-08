import { FC, useState } from "react";
import LoginForm from "../../components/LoginForm";
import { User } from "../../interfaces";
import { supabase } from "../../supabaseClient";
import { useHistory } from "react-router-dom";
import toast from "react-hot-toast";
import { useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";

export interface LoginProps {}

const Login: FC<LoginProps> = () => {
    const history = useHistory();
    const [error, setError] = useState(false);
    const { isLogged } = useAuth();

    useEffect(() => {
        if (isLogged) return history.push("/error");
    }, [history, isLogged]);

    const loginUser = async (login: User) => {
        try {
            const { user, error } = await supabase.auth.signIn(login);
            if (error || !user) {
                setError(true);
                toast.error(error?.message as string);
                return;
            }
            history.push("/account");
            toast.success("Welcome");
        } catch (error) {
            setError(true);
        }
    };

    const signInWithGoogle = async () => {
        try {
            const { user, error } = await supabase.auth.signIn(
                {
                    provider: "google",
                },
                { redirectTo: "http://localhost:3000/account" }
            );

            if (error) return toast.error(error.message);
            if (user) {
                toast.success("Welcome");
                history.push("/blog");
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="section min-h-screen">
            <LoginForm
                loginUser={loginUser}
                error={error}
                signInWithGoogle={signInWithGoogle}
            />
        </div>
    );
};

export default Login;
