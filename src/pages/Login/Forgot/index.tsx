import { FC, useState } from "react";
import toast from "react-hot-toast";
import { useHistory } from "react-router";
import { InputType, SubmitType } from "../../../interfaces";
import { supabase } from "../../../supabaseClient";

interface ForgotProps {}

const Forgot: FC<ForgotProps> = () => {
    const [email, setEmail] = useState<null | string>(null);
    const history = useHistory();
    const handleChange = (ev: InputType) => {
        const { value } = ev.target;
        setEmail(value);
    };

    const passwordRecovery = async (email: string) => {
        try {
            const { data, error } =
                await supabase.auth.api.resetPasswordForEmail(email);
            if (data) {
                toast.success("Verify your email and recovery your password");
                history.push("/");
            }
            if (error) return toast.error(error.message);
        } catch (error) {
            console.log(error);
        }
    };

    const handleSubmit = (ev: SubmitType) => {
        ev.preventDefault();
        passwordRecovery(email as string);
    };

    return (
        <div className="mx-auto container flex justify-center items-center min-h-screen ">
            <div className="border-2 border-black rounded-md  shadow-xl p-10  space-y-5">
                <h1 className="text-2xl font-black uppercase">
                    Password recovery
                </h1>
                <div className="bg-yellow-400 h-1"></div>
                <span className="inline-flex">
                    Don't worry these things happen.
                </span>
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="form-group">
                        <label htmlFor="email" className="font-bold">
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            className="input-line-style"
                            onChange={(ev) => handleChange(ev)}
                            required
                        />
                    </div>
                    <button className="btn-login">Recovery</button>
                </form>
            </div>
        </div>
    );
};

export default Forgot;
