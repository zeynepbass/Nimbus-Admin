"use client";

import { useEffect } from "react";
import usePost from "@/hooks/usePost";

export default function DetailPage({id}) {
  const { details, getDetails } = usePost();
  useEffect(() => {
    if (id) getDetails(id);
  }, [id]);

  return (
    <div>
      <h1>Detay: {id}</h1>
      {details && (
        <div>
          <h2>{details.title}</h2>
          <p>{details.body}</p>
        </div>
      )}
    </div>
  );
}
