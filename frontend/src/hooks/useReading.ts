import useSWR from "swr";
import { useGroupContext } from "../context/GroupContextProvider";
import { fetcher } from "../context/fetcher";

const BASE_URL = import.meta.env.VITE_API_HOST;

export const useReadingGet = ( url: string, readingId?: string ) => {
    console.log('in useReadingGet');
    console.log('url', url);
  const { data, error, isLoading, mutate } = useSWR(
    url,
    async (url: string) => {
      const res = await fetch(url, { credentials: "include", method: "GET" });
      if (!res.ok) throw new Error("Failed to fetch files");
      return res.json();
    }
  );
  console.log('data', data);
  return {
    readings:data ?? [],
    isLoading,
    error,
    refresh: mutate
  };
}

export const useReadings = <T>() => {
  const { activeGroup } = useGroupContext();
  return useSWR<T>(
    activeGroup ? `${BASE_URL}/api/events/${activeGroup.id}` : null,
    fetcher
  );
}

// const useReading = (url: string) => {
//   const { data: readings, error, mutate } = useSWR(
//     url,
//     (_url) => fetch(_url, { credentials: "include" }).then(r => r.json())
//   );

//   const get = (id) => files && files.find(file => file.id === id);

//   const edit = async (id, updatedData) => {
//     // Optimistically update the cached data
//     mutate('/api/files', files.map(file => 
//       file.id === id ? { ...file, ...updatedData } : file
//     ), false); // Prevent immediate revalidation

//     // Send update request to the server
//     await fetch(`/api/files/${id}`, {
//       method: 'PUT',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(updatedData),
//     });

//     // Revalidate after updating
//     mutate('/api/files');
//   };

//   const deleteFile = async (id) => {
//     // Optimistically delete the file from cached data
//     mutate('/api/files', files.filter(file => file.id !== id), false); // Prevent immediate revalidation

//     // Send delete request to the server
//     await fetch(`/api/files/${id}`, {
//       method: 'DELETE',
//     });

//     // Revalidate after deletion
//     mutate('/api/files');
//   };

//   return { files, error, get, edit, delete: deleteFile };
// };