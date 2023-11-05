"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchBlogs = async () => {
  const data = await axios({
    url: "http://localhost:5000/mongo/post/search",
    method: "POST",
  });
  return data.data;
};

export const useAllBlogs = () => {
  return useQuery({
    queryKey: ["blogs"],
    queryFn: fetchBlogs,
    refetchOnWindowFocus: true,
    refetchOnMount: true,
  });
};
