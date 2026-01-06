"use client";

import usePost from "@/hooks/usePost";

import { useRouter } from "next/navigation";

export default function GetPage() {
  const { data } = usePost();
  const router = useRouter();

  return (
    <div>
      {data.map((item) => (
          <button
          key={item.id}
          onClick={() => router.push(`/dashboard/${item.id}`)}
        >
          {item.title}
        </button>
      ))}
    </div>
  );
}
