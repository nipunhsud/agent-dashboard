import { useEffect, useState } from "react";

const useCSRFToken = () => {
    const [csrfToken, setCSRFToken] = useState(null);

    const fetchCSRFToken = async () => {
        // add process.env.backend_url
        try {
            const response = await fetch("http://127.0.0.1:8000/get-csrf-token/", {
                method: "GET",
                credentials: "include",
            });

            console.log("This is the response:", response);

            if (!response.ok) {
                console.error("Failed to fetch CSRF token:", response.status, response.statusText);
                return null;
            }

            const data = await response.json();
            console.log("CSRF token fetched successfully:", data);

            const csrfToken = data.csrfToken;
            setCSRFToken(csrfToken); 
        } catch (error) {
            console.error("Error during CSRF token fetch:", error);
        }
    };

    useEffect(() => {
        fetchCSRFToken(); 
    }, []);

    return csrfToken;
};

export default useCSRFToken;
