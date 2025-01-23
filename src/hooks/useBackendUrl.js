
const useBackendUrl = () => {
    return process.env.REACT_APP_NODE_ENV === "production"
      ? process.env.REACT_APP_BACKEND_URL
      : process.env.REACT_APP_BACKEND_URL_LOCAL;
}

export default useBackendUrl;