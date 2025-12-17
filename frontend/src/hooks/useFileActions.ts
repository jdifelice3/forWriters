import { useCallback } from "react";

export function useFileActions(refresh: () => void) {
  const deleteFile = useCallback(async (id: string) => {
    await fetch(`/api/files/${id}`, { method: "DELETE" });
    refresh();
  }, [refresh]);

//   const updateMetadata = useCallback(async (id: string, data: UpdateDto) => {
//     await fetch(`/api/files/${id}`, {
//       method: "PUT",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(data),
//     });
//     refresh();
//   }, [refresh]);

  return {
    deleteFile,
    //updateMetadata,
  };
}
