import { useEffect, useState } from "react";

const useCSRFToken = () => {
    const [csrfToken, setCSRFToken] = useState('');

    const getCookie = (name) => {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    };

    useEffect(() => {
      
        const fetchCSRFToken = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/csrf_cookie`, {
                    method: "GET",
                    credentials: "include", 
                });

                if (!response.ok) {
                    console.error("Failed to fetch CSRF token:", response.status, response.statusText);
                    return;
                }

                const token = getCookie('csrftoken');
                setCSRFToken(token);
            } catch (error) {
                console.error("Error fetching CSRF token:", error);
            }
        };

        fetchCSRFToken();
    }, []);

    return csrfToken;
};

export default useCSRFToken;

