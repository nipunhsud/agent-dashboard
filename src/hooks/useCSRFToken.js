import { useEffect, useState } from "react";
import useBackendUrl from "./useBackendUrl";

const backendUrl = useBackendUrl();

const useCSRFToken = () => {
    const [csrfToken, setCSRFToken] = useState("");

    useEffect(() => {
        const fetchCSRFToken = async () => {
            try {
                const response = await fetch(`${backendUrl}/csrf_cookie`, {
                    method: "GET",
                    credentials: "include",
                });

                if (!response.ok) {
                    console.error("Failed to fetch CSRF token:", response.status, response.statusText);
                    return;
                }
                const data = await response.json();
            
                setCSRFToken(data.csrfToken);
            } catch (error) {
                console.error("Error fetching CSRF token:", error);
            }
        };

        fetchCSRFToken();
    }, []);

    return csrfToken; 
};

export default useCSRFToken;