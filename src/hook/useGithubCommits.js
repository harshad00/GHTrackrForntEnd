import { useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_BACKEND_URL + "/api/github/commits";

export const useGithubCommits = (username, repo) => {
  const [commits, setCommits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCommits = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch(`${API_URL}?username=${username}&repo=${repo}`, {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await res.json();

        if (!res.ok) {
          // Specific handling for "no commits" (404)
          if (res.status === 404) {
            setError(data.message || "No commits found for yesterday.");
            setCommits([]);
            return;
          }
          throw new Error(data.message || "Failed to fetch commits");
        }

        setCommits(data.commits || []);
      } catch (err) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    if (username && repo) {
      fetchCommits();
    }
  }, [username, repo]);

  return { commits, loading, error };
};
