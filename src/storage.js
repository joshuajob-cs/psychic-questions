import React from "react";
import { useState, useEffect } from "react";

export default function useLocalStorage() {
  const [data, setData] = useState("");

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(data));
  }, [data]);

  return [data, setData];
}
