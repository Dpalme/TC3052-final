import { useCallback, useState, useEffect } from "react";

const BASE_URL = "https://api.rawg.io/api";
const API_KEY = "0c564483a6284c25867f71acbd2ea538";


export const useFetch = (url) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);

    const fetchData = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(BASE_URL + url + (url.includes('?') ? '&' : '?') + `key=${API_KEY}`);            
            if (!response.ok) throw new Error(response.statusText);
            const data = await response.json();
            setLoading(false);
            return setData(data);
        } catch(err) {
            console.error(err);
            setError(err);
            setLoading(false);
        }
    }, [url]);

    useEffect(() => {
        fetchData();
    }, [url, fetchData]);

    return { data, loading, error };
}