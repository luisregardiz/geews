import { FC, useState } from "react";
import { Link } from "react-router-dom";
import { InputType, SubmitType, User } from "../../interfaces";
import SignImg from "../../images/signup.svg";

interface SignUpFormProps {
    signUpUser: (signUp: User) => void;
    error: boolean;
}

const SignUpForm: FC<SignUpFormProps> = ({ signUpUser, error }) => {
    const initialValue: User = {
        email: "",
        password: "",
    };
    const [signUp, setSignUp] = useState(initialValue);

    const handleChange = (ev: InputType) => {
        const { name, value } = ev.target;
        setSignUp((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (ev: SubmitType) => {
        ev.preventDefault();
        signUpUser(signUp);
        if (error) return;
        signUpUser(initialValue);
    };
    return (
        <div className="flex flex-col justify-center mt-10 items-center space-y-5">
            <h1 className="text-4xl font-black uppercase">Sign Up</h1>
            <div className="  border-2 border-black  shadow-xl  flex items-center md:flex-row flex-col">
                <img
                    src={SignImg}
                    alt="sign_up_image"
                    className="object-cover"
                />
                <form className="space-y-5 p-10" onSubmit={handleSubmit}>
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
                    <div>
                        <label htmlFor="password" className="font-bold">
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            className="input-line-style"
                            onChange={(ev) => handleChange(ev)}
                            required
                        />
                    </div>

                    <div>
                        <button className="btn-login" type="submit">
                            Join
                        </button>
                    </div>
                </form>
            </div>
            <div>
                <span>You have an account?</span>
                <Link to="/login" className="ml-2 font-bold hover:underline ">
                    Login
                </Link>
            </div>
        </div>
    );
};

export default SignUpForm;
