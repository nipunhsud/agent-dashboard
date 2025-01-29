const useRagUrl = () => {
    return process.env.REACT_APP_NODE_ENV === "production"
      ? process.env.REACT_APP_RAG_URL
      : process.env.REACT_APP_RAG_URL_LOCAL;
  }

  export default useRagUrl;