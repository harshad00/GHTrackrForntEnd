import { useEffect, useState } from "react";

const API_URL = "http://localhost:8000/api/github/commits";

export const useGithubCommits = (username, repo) => {
  const [commits, setCommits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCommits = async () => {
      setLoading(true);

      try {
        const res = await fetch(`${API_URL}?username=${username}&repo=${repo}`, {
          method: 'GET',
          credentials: 'include',
          headers: {
        
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) throw new Error("Failed to fetch commits");

        const data = await res.json();
        console.log(data);
        
        setCommits(data.commits);
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
