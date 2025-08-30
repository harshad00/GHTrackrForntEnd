import { useApi } from "./useAPI";

export function useUserRepositories(userId) {
//   const { data, error, loading, refetch } = useApi({
//     url: userId ? `http://localhost:8000/api/user/all?userId=${userId}` : null,
//     method: "GET",
//     autoFetch: !!userId, // only fetch when we actually have a userId
//   });

     const { data, loading, error } = useApi({
        url:`http://localhost:8000/api/user/all?userId=${userId}`
      });
  // Normalize data so Myrepo always gets an array
  const repositories = data?.repositories || [];

  return { repositories, loading, error };
}

export default useUserRepositories;