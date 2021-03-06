import { FC, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import UserAccount from "../../components/UserAccount";
import UserPosts from "../../components/UserAccount/UserPosts";
import { UserContext } from "../../context/UserContext";

export interface AccountProps {}

const Account: FC<AccountProps> = () => {
    const { userData } = useContext(UserContext);
    const history = useHistory();
    useEffect(() => {
        if (userData.user_metadata === undefined) return;
        const metadata = Object.entries(userData.user_metadata);
        const userProvider = userData?.app_metadata?.provider;
        if (metadata?.length < 2 && userProvider === "email") {
            return history.push("/account/settings");
        }
        if (metadata?.length < 3 && userProvider !== "email") {
            return history.push("/account/settings");
        }
    }, [history, userData?.app_metadata?.provider, userData.user_metadata]);
    return (
        <div className="section min-h-screen">
            <UserAccount />
            <UserPosts />
        </div>
    );
};

export default Account;
