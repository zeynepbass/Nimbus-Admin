"use client";
import { useEffect, useState } from "react";
import postService  from "@/services/postService";
export default function usePost() {
  const [data, setData] = useState([]);
  const [details, setDetails] = useState("");

  useEffect(() => {
    postService().getAll().then(setData);
  }, []);

  const getDetails = async (id) => {
    const res = await postService().getById(id);
    setDetails(res);
  };

  return { data, details, getDetails };
}
