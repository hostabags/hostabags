
"use client";

import { useEffect, useState } from "react";

export default function Map() {
  const [data, setData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/data/data.json");
        const json = await res.json();
        setData(json);
     
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    }

    fetchData();
  }, []);
useEffect(() => {
    if (data) {
        console.log("Data actualizada:", data);
    }
    }, [data]);
  return <div>Data: </div>;
}
