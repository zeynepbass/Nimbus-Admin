"use client";

import usePost from "@/hooks/usePost";
import { useRouter } from "next/navigation";
export default function GetPage() {
  const { data,postDelete } = usePost();
  const router = useRouter();
  const handleClick=(id)=>{
    postDelete(id)
  }

  return (
    <div>
      {data.map((item) => (
        <div key={item.id}>

          <button

          onClick={() => router.push(`/dashboard/${item.id}`)}
        >
          {item.title}
        </button>
        <button onClick={()=>handleClick(item.id)}>delete</button>
        </div>
      ))}
    </div>
  );
}
