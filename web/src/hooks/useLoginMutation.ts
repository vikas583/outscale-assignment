import { AxiosError } from "axios";
import { useMutation, useQueryClient } from "react-query";
import { useHistory } from "react-router";
import { LoginResp, User } from "../types";
import axiosClient from "../utils/axiosClient";

export const useLoginMutation = (cb: (err: boolean, msg?: string) => void) => {
  const queryClient = useQueryClient();
  const router = useHistory();
  return useMutation<
    LoginResp,
    AxiosError<any>,
    {
      email: string;
      password: string;
    }
  >(
    ({ email, password }) => {
      // const body: Record<string, any> = {
      //   email,
      //   password,
      // };
      return axiosClient
        .post<LoginResp>(`/auth/login`, { email, password })
        .then((res) => res.data);
    },

    {
      onError: (err) => {
        console.error(err.response?.data);
        queryClient.setQueryData<User | undefined>(["user"], undefined);
        let msg = "Cannot login! Please try again later.";
        if (err.response) {
          const { message } = err.response.data;
          msg = message;
        }
        cb(true, msg);
      },
      onSuccess: (resp) => {
        console.log(resp);
        localStorage.setItem("token", resp.token);
        queryClient.setQueryData<User>(["user"], resp.user);
        cb(false);
        router.replace("/admin/my-books");
      },
    }
  );
};
