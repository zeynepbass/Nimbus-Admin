"use client";
import { useEffect, useState } from "react";
import postService  from "@/services/postService";

export default function usePost() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await postService.getAll();
        setData(res);
      } catch (error) {
        console.error(error);
      }
    };

    getData();
  }, []);

  return { data };
}
