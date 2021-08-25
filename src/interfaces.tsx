
export interface Data {
    title: string;
    body: string;
    author: string;
    id: number;
    image: string;
}

export interface CreateBlog {
    title: string;
    body: string;
    author: string;
    image: string;

}

export type SubmitBlog = React.FormEvent<HTMLFormElement>

export type BlogFormEvent = 
    | React.ChangeEvent<HTMLInputElement>
    | React.ChangeEvent<HTMLTextAreaElement>
    | React.ChangeEvent<HTMLSelectElement>



export type Action = 
    | {type: "Fetching"}
    | {type: "Fetched", data: [], payload: Data[] }
    | {type: "Fetch_Error", error: string, payload: string}
