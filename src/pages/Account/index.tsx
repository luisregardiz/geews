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
        if (metadata?.length < 5) {
            return history.push("/account/settings");
        }
    }, [history, userData?.user_metadata]);
    return (
        <div className="section">
            <UserAccount />
            <UserPosts />
        </div>
    );
};

export default Account;
