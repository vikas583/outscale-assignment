import { AxiosError } from "axios";
import { useQuery } from "react-query";
import { MyBooksList } from "../types";
import axiosClient from "../utils/axiosClient";

export const useMyBooks = (pageTable: number, resultsPerPage: number = 20) => {
  const newSkip = (pageTable - 1) * resultsPerPage;
  return useQuery<any, AxiosError<any>, MyBooksList>(
    ["myBooksList", pageTable],
    () =>
      axiosClient
        .get<MyBooksList>(`/books/user/${newSkip}/${resultsPerPage}`)
        .then(({ data }) => data),
    {
      staleTime: Infinity,
      keepPreviousData: true,
    }
  );
};
