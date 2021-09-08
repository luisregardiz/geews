import { useEffect, useState } from "react";
import useSWR from "swr";
import { fetcherPosts } from "../helpers/fetcherposts";
import { fetcherProfile } from "../helpers/fetcherProfile";
import { Posts, Profile } from "../interfaces";

export const useProfile = (user_id: string) => {
    const [userInfo, setUserInfo] = useState<Profile[]>([]);
    const [userPosts, setUserPosts] = useState<Posts[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const { data: profile, error: errorProfile } = useSWR(
        `${process.env.REACT_APP_SUPABASE_URL}/rest/v1/profiles?user_id=eq.${user_id}`,
        fetcherProfile
    );
    const { data: posts, error: errorPost } = useSWR(
        `${process.env.REACT_APP_SUPABASE_URL}/rest/v1/posts?user_id=eq.${user_id}`,
        fetcherPosts
    );

    useEffect(() => {
        if (profile || posts) {
            setUserInfo(profile as Profile[]);
            setUserPosts(posts as Posts[]);
            setLoading(false);
        }
        if (errorProfile || errorPost) {
            setError(errorProfile.message || errorPost.message);
        }
        if (!profile || !posts) {
            setLoading(true);
        }
    }, [errorPost, errorProfile, posts, profile]);

    return {
        userInfo,
        userPosts,
        loading,
        error,
    };
};
