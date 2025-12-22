import useSWR from "swr";
import { fetcher } from "../context/fetcher";
import { AppFile } from "../types/domain-types";
import { FileFormInput } from "../types/FileTypes";
import { FilesAPI } from "../api/filesApi";

const useUserFiles = () => {
  return useSWR<AppFile[]>(
    "/files",
    fetcher
  );
}

export const useFileActions = (
  userId: string,
  refreshFiles: () => void
) => {
  const remove = async (fileId: string) => {
    await FilesAPI.remove(fileId);
    refreshFiles();
  };

  const update = async (data: FileFormInput) => {
    await FilesAPI.update(data);
    refreshFiles();
  };

  return { remove, update };
}
export default useUserFiles;
