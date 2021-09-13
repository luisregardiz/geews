import { FC, useState } from "react";
import { Link } from "react-router-dom";
import { InputType, SubmitType, User } from "../../interfaces";
import GoogleIcon from "../../images/google.svg";
import { signInWithGoogle } from "../../helpers/signInWithGoogle";

interface LoginFormProps {
    loginUser: (login: User) => void;
    error: boolean;
}

const LoginForm: FC<LoginFormProps> = ({ loginUser, error }) => {
    const initialValue: User = {
        email: "",
        password: "",
    };
    const [login, setLogin] = useState(initialValue);
    const handleChange = (ev: InputType) => {
        const { name, value } = ev.target;
        setLogin((prev) => ({
            ...prev,
            [name]: value.trim(),
        }));
    };

    const handleSubmit = (ev: SubmitType) => {
        ev.preventDefault();
        loginUser(login);
        if (!error) {
            return setLogin(initialValue);
        }
    };

    return (
        <div className="flex flex-col justify-center mt-10 items-center space-y-5 ">
            <h1 className="text-4xl font-black uppercase">Login</h1>
            <form
                className="space-y-5 border-2 border-black rounded-md  shadow-xl p-10"
                onSubmit={handleSubmit}
            >
                <div className="form-group">
                    <label htmlFor="email" className="font-bold">
                        Email
                    </label>
                    <input
                        type="email"
                        name="email"
                        value={login.email}
                        className="input-line-style"
                        onChange={(ev) => handleChange(ev)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password" className="font-bold">
                        Password
                    </label>
                    <input
                        type="password"
                        name="password"
                        value={login.password}
                        className="input-line-style"
                        onChange={(ev) => handleChange(ev)}
                        required
                    />
                </div>
                <Link
                    to="/forgot"
                    className="text-sm inline-flex  hover:underline"
                >
                    Forgot your password?
                </Link>
                <div className="space-y-3">
                    <button className="btn-login" type="submit">
                        Login
                    </button>
                    <button
                        onClick={signInWithGoogle}
                        type="button"
                        className="btn bg-blue-600  text-white w-full rounded-md shadow-none border-2 border-blue-600 "
                    >
                        Sign in with Google
                        <img src={GoogleIcon} alt="Google" className="ml-2" />
                    </button>
                </div>
            </form>

            <div>
                <span>Don't have an account?</span>
                <Link to="/signup" className="ml-2 font-bold hover:underline ">
                    Join
                </Link>
            </div>
        </div>
    );
};

export default LoginForm;
