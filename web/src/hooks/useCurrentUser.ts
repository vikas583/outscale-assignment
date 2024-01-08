import { AxiosError } from "axios";
import ms from "ms";
import { useQuery, useQueryClient } from "react-query";
import { User } from "../types";
import axiosClient from "../utils/axiosClient";

export const useCurrentUser = () => {
  const queryClient = useQueryClient();
  return useQuery<any, AxiosError<Error>, User>(
    ["user"],
    () => axiosClient.get<User>(`/auth/me`).then((resp) => resp.data),
    {
      retry: false,
      refetchOnMount: false,
      cacheTime: ms("1d"),
      staleTime: Infinity,
      onError() {
        queryClient.setQueryData<User | undefined>(["user"], undefined);
      },
    }
  );
};
