"use client";

import { useRef } from "react";
import { useReactToPrint } from "react-to-print";

export default function usePrint() {
  const contentRef = useRef(null);
  const print = useReactToPrint({ contentRef });

  return { contentRef, print };
}
