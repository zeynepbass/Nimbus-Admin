"use client";

import { useState } from "react";
import { setByPath } from "@/lib/objectPath";

export default function useForm(initialValues) {
  const [values, setValues] = useState(initialValues);

  const setValue = (path, value) =>
    setValues((prev) => setByPath(prev, path, value));

  const reset = () => setValues(initialValues);

  return { values, setValues, setValue, reset };
}
