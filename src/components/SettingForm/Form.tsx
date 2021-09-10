import { FC } from "react";
import { BlogFormEvent, SubmitType, UserInfo } from "../../interfaces";
import Loader from "../Loader";

export interface FormProps {
    handleChange: (ev: BlogFormEvent) => void;
    updateUser: UserInfo;
    isProvider: boolean;
    handleSubmit: (ev: SubmitType) => void;
}

const Form: FC<FormProps> = ({
    handleChange,
    updateUser,
    isProvider,
    handleSubmit,
}) => {
    return (
        <>
            <form
                className="space-y-5 border-2 border-black rounded-md  shadow-xl p-10 md:w-1/3 w-4/5"
                onSubmit={(ev) => handleSubmit(ev)}
            >
                <div className="form-group">
                    <label htmlFor="fname" className="font-bold">
                        Full name *
                    </label>
                    <input
                        type="text"
                        name="fname"
                        value={updateUser.fname}
                        className="input-line-style"
                        placeholder="Add your full name"
                        onChange={(ev) => handleChange(ev)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="email" className="font-bold">
                        Email
                    </label>
                    <input
                        type="email"
                        name="email"
                        value={updateUser.email}
                        className="input-line-style disabled:opacity-50"
                        onChange={(ev) => handleChange(ev)}
                        disabled={isProvider ? true : false}
                    />
                </div>
                <div>
                    <label htmlFor="password" className="font-bold">
                        Password
                    </label>
                    <input
                        type="password"
                        name="password"
                        value={updateUser.password}
                        className="input-line-style disabled:opacity-50"
                        onChange={(ev) => handleChange(ev)}
                        disabled={isProvider ? true : false}
                    />
                </div>
                <div>
                    <label htmlFor="instagram" className="font-bold">
                        Instagram
                    </label>
                    <input
                        type="text"
                        name="instagram"
                        value={updateUser.instagram}
                        className="input-line-style"
                        onChange={(ev) => handleChange(ev)}
                    />
                </div>
                <div>
                    <label htmlFor="twitter" className="font-bold">
                        Twitter
                    </label>
                    <input
                        type="text"
                        name="twitter"
                        value={updateUser.twitter}
                        className="input-line-style"
                        onChange={(ev) => handleChange(ev)}
                    />
                </div>
                <div>
                    <label htmlFor="facebook" className="font-bold">
                        Facebook
                    </label>
                    <input
                        type="text"
                        name="facebook"
                        value={updateUser.facebook}
                        className="input-line-style"
                        onChange={(ev) => handleChange(ev)}
                    />
                </div>
                <div>
                    <label htmlFor="bio" className="font-bold">
                        Biography *
                    </label>
                    <textarea
                        name="bio"
                        value={updateUser.bio}
                        className="textarea-line-style"
                        placeholder="Add something about yourself"
                        onChange={(ev) => handleChange(ev)}
                        required
                    ></textarea>
                </div>
                <div className="space-y-3">
                    <button className="btn-login" type="submit">
                        Done
                    </button>
                </div>
            </form>
        </>
    );
};

export default Form;
