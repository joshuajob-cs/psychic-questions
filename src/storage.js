import React from "react";
import { useState, useEffect } from "react";

export default function useLocalStorage() {
  const [data, setData] = useState(() => {
    const storedData = localStorage.getItem("user");
    return storedData ? JSON.parse(storedData) : "";
  });

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(data));
  }, [data]);

  return [data, setData];
}
