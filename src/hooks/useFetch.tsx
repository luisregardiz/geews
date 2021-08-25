import { useEffect, useRef, useState } from "react";
import { Data } from "../interfaces";

const useFetch = (URL: string) => {
    const cache = useRef<any>({});
    const [data, setData] = useState<Data[] | Data>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        const getBlogs = async () => {
            setIsLoading(true);
            if (cache.current[URL]) {
                const data = cache.current[URL];
                setData(data);
                setIsLoading(false);
            } else {
                try {
                    const res = await fetch(URL);
                    const result: Data[] = await res.json();
                    cache.current[URL] = result;
                    setData(result);
                    setIsLoading(false);
                } catch (error) {
                    setIsLoading(false);
                    setError(error.message);
                }
            }
        };
        getBlogs();


    }, [URL]);

    return {
        data,
        isLoading,
        error,
    };
};

export default useFetch;
