import { useState, useEffect, useCallback } from 'react';

export function useApi({ url, method = 'GET', body = null, headers = { 'Content-Type': 'application/json' }, autoFetch = true }) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(url, {
        method,
        headers,
        body: body ? JSON.stringify(body) : null,
      });

      const result = await response.json();

      if (!response.ok) {
        throw result;
      }

      setData(result);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (autoFetch) {
      fetchData();
    }
  }, [fetchData, autoFetch]);

  return { data, error, loading, refetch: fetchData };
}
