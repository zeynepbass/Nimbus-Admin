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
    try {
      const res = await postService().getById(id);
      setDetails(res);
    } catch (error) {
       console.log(error)
    }
  };
  const postDelete = async (id) => {
    try {
      await postService().getDelete(id);
  
      setData((prevData) =>
        prevData.filter((item) => item.id !== id)
      );
    } catch (error) {
      console.error(error);
    }
  };
  

  return { data, details, getDetails,postDelete };
}
