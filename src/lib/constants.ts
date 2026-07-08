export const GITHUB_USERNAME = "Mrshahzad07";
export const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN || "";
export const REST_API_BASE = "https://api.github.com";
export const GRAPHQL_API_BASE = "https://api.github.com/graphql";

// Fetch options generator to handle auth gracefully
export const getFetchOptions = () => {
  const headers: Record<string, string> = {
    Accept: "application/vnd.github.v3+json",
  };
  
  if (GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${GITHUB_TOKEN}`;
  }

  return { headers };
};
