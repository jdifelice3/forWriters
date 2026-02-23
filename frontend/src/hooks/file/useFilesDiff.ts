import useSWR from "swr";
import { apiFetch } from "../../api/client";
import { useUserContext } from "../../context/UserContext";
import { DiffResponse } from "../../types/Diff";

export const useFilesDiff = (appFileMetaId?: string) => {
  const { user } = useUserContext();

  const key =
    user && appFileMetaId
      ? ["file-diff", appFileMetaId]
      : null;

  const swr = useSWR<DiffResponse>(
    key,
    ([_, id]) => apiFetch(`/file/${id}/compare`),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  return swr;
};