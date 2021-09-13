import toast from "react-hot-toast";
import { supabase } from "../supabaseClient";

export const signInWithGoogle = async () => {
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
        }
    } catch (error) {
        console.error(error);
    }
};
