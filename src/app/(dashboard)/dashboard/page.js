"use client";
import usePost  from "@/app/hooks/usePost";
export default function GetPage() {
  const { data } = usePost();
  return (
    <div>
      {data.map((item, index) => (
        <div key={index}>
          <p>{item.title}</p>
        </div>
      ))}
    </div>
  );
}