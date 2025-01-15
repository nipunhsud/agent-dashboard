import React from "react";
import useCSRFToken from "./useCSRFToken"; 

const CSRFToken = () => {
    const csrfToken = useCSRFToken();

    return (
        <input
            type="hidden"
            name="csrfmiddlewaretoken"
            value={csrfToken || ""}
        />
    );
};

export default CSRFToken;

