import { useCallback, useState } from "react";
import { useAuth } from "../providers/authProvider";

const BASE_URL = 'http://localhost:8081/api';

export const useBack = () => {
    const auth = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchData = useCallback(
        async (url, method = "GET", body = null, query = {}) => {
            setIsLoading(true);
            setError(null);
            console.log(url, method, body, query);
            let authHeader = ''
            if (auth && auth.user)
                authHeader = `${auth.user.username} ${auth.user.password}`

            if (method === "POST" || method === "PATCH" || method === "DELETE") {
                body = JSON.stringify(body);
            } else {
                body = null;
            }

            query = Object.keys(query).map(key => `${key}=${query[key]}`).join('&');

            try {
                const response = await fetch(BASE_URL + url + '?' + query, {
                    credentials: 'same-origin',
                    method,
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': authHeader
                    },
                    body
                });

                if (!response.ok) {
                    return null;
                }

                const responseData = await response.json();
                setIsLoading(false);
                return responseData;
            } catch (err) {
                console.error(err)
                setError(err);
                setIsLoading(false);
            }
        }, [auth]);

    return { isLoading, error, fetchData, resetError: () => setError(null) };
}