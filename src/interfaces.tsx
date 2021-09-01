export interface Posts {
    title: string;
    body: string;
    author: string;
    id: number;
    image: string;
    user_id: string;
    author_avatar: string;
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
}
export interface CreatePost {
    title: string;
    body: string;
    image: string;
}
export interface User {
    username?: string;
    email: string;
    password: string;
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
