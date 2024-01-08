import { AxiosError } from "axios";
import { useQuery } from "react-query";
import { AdminUserHeaderInfoResponse } from "../types";
import axiosClient from "../utils/axiosClient";

export const useAdminUserHeaderInfo = () => {
  return useQuery<any, AxiosError<any>, AdminUserHeaderInfoResponse>(
    ["admin", "header"],
    () =>
      axiosClient
        .get<AdminUserHeaderInfoResponse>("/admin/headerCardData")
        .then(({ data }) => data),
    {
      staleTime: Infinity,
    }
  );
};
