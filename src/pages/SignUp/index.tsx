import { FC, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useHistory } from "react-router-dom";
import SignUpForm from "../../components/SignUpForm";
import { User } from "../../interfaces";
import { supabase } from "../../supabaseClient";

export interface SignUpProps {}

const SignUp: FC<SignUpProps> = () => {
    const history = useHistory();
    const [error, setError] = useState(false);
    const signUpUser = async (signUp: User) => {
        try {
            const { user, error } = await supabase.auth.signUp(signUp);
            if (user) {
                setError(false);
                toast.success("Verify your email and Login");
            }
            history.push("/login");

            if (error) {
                setError(true);
                toast.error(error.message);
            }
        } catch (error) {
            console.log(error);
            setError(true);
        }
    };
    return (
        <div className="section min-h-screen">
            <Toaster position="top-center" reverseOrder={false} />
            <SignUpForm signUpUser={signUpUser} error={error} />
        </div>
    );
};

export default SignUp;
