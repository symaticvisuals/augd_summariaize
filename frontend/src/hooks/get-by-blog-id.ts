"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchBlogsById = async (id: string) => {
  const data = await axios({
    url: `http://localhost:5000/mongo/post/${id}`,
    method: "GET",
  });
  return data.data;
};

export const useAllBlogsById = (id: string) => {
  return useQuery({
    queryKey: ["blogs-by-id", id],
    queryFn: async () => await fetchBlogsById(id),
    refetchOnWindowFocus: true,
    refetchOnMount: true,
    enabled: !!id,
  });
};
