"use client";
import "convention/app/css/print.css";
import { useState, useEffect } from "react";

export default function PrintPage() {
  const [pageData, setPageData] = useState(null);

  useEffect(() => {
    console.log("loading...");
    let pathName = window.location.pathname;

    if (window.location.pathname == "/printSchools") {
      fetch("https://localhost:44398/api/MiniConvention/schoolsTables")
        .then((response) => response.json())
        .then((data) => {
          let pageData = {
            pathName: pathName,
            tables: data,
          };

          console.log(pageData);
          setPageData(pageData);
        });
    }
  }, []);

  if (!pageData) return <div>{"..."}</div>;

  return <div>{"Hi :)"}</div>;
}
