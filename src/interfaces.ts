export interface Posts {
    title: string;
    image: string;
    body: string;
    author: string;
    id: number;
    category: string;
    youtube: string;
    twitter: string;
    user_id: string;
    created_at?: string;
}
export interface UserInfo {
    user_id: string;
    fname: string;
    email: string | undefined;
    password: string;
    instagram: string;
    twitter: string;
    facebook: string;
    bio: string;
    avatar_url?: string;
}
export interface CreatePost {
    title: string;
    image: string;
    body: string;
    category: string;
    twitter: string;
    youtube: string;
}
export interface User {
    username?: string;
    email: string;
    password: string;
}

export interface Profile {
    user_id: string;
    full_name: string;
    instagram_url: string;
    twitter_url: string;
    facebook_url: string;
    biography: string;
    avatar_url: string;
}

export interface UserData {
    id: string;
    aud: string;
    email: string;
}
export type InputType = React.ChangeEvent<HTMLInputElement>;
export type SubmitType = React.FormEvent<HTMLFormElement>;

export type BlogFormEvent =
    | React.ChangeEvent<HTMLInputElement>
    | React.ChangeEvent<HTMLTextAreaElement>
    | React.ChangeEvent<HTMLSelectElement>;

export type Action =
    | { type: "Fetching" }
    | { type: "Fetched"; data: []; payload: Posts[] }
    | { type: "Fetch_Error"; error: string; payload: string };
