"use client";
import "convention/app/css/print.css";
import { useState, useEffect } from "react";
import SchoolPrintTable from "./SchoolPrintTable";
import EventPrintTable from "./EventPrintTable";

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

          setPageData(pageData);
        });
    } else if (window.location.pathname == "/printSchool") {
      let queryStringSchoolID = new URLSearchParams(window.location.search).get(
        "school"
      );

      fetch(
        "https://localhost:44398/api/MiniConvention/schoolTable/" +
          queryStringSchoolID
      )
        .then((response) => response.json())
        .then((data) => {
          let pageData = {
            pathName: pathName,
            table: data,
          };

          console.log(pageData);
          setPageData(pageData);
        });
    } else if (window.location.pathname == "/printEvents") {
      fetch("https://localhost:44398/api/MiniConvention/eventsTables")
        .then((response) => response.json())
        .then((data) => {
          let pageData = {
            pathName: pathName,
            tables: data,
          };

          setPageData(pageData);
        });
    } else if (window.location.pathname == "/printEvent") {
      let queryStringSchoolID = new URLSearchParams(window.location.search).get(
        "school"
      );

      fetch(
        "https://localhost:44398/api/MiniConvention/eventTable/" +
          queryStringSchoolID
      )
        .then((response) => response.json())
        .then((data) => {
          let pageData = {
            pathName: pathName,
            table: data,
          };

          setPageData(pageData);
        });
    }
  }, []);

  if (!pageData) return <div>{"..."}</div>;

  // Show the corresponding tables to print
  if (pageData.pathName == "/printSchools") {
    let tables = [];
    pageData.tables.forEach((tableData) => {
      tables.push(
        <SchoolPrintTable tableData={tableData} key={tableData.tableSchoolID} />
      );
    });

    return <div id="pageContainer">{tables}</div>;
  } else if (pageData.pathName == "/printSchool") {
    return (
      <div id="pageContainer">
        <SchoolPrintTable tableData={pageData.table} />
      </div>
    );
  } else if (window.location.pathname == "/printEvents") {
    let tables = [];
    let currentCategory = "";
    pageData.tables.forEach((tableData) => {
      if (tableData.tableData.length == 0) return;
      if (tableData.tableCategory != currentCategory) {
        currentCategory = tableData.tableCategory;
        console.log(currentCategory);

        tables.push(
          <div className="eventCategoryPrint Header" key={currentCategory}>
            {currentCategory}
          </div>
        );
      }

      tables.push(
        <EventPrintTable tableData={tableData} key={tableData.tableEventID} />
      );
    });

    return (
      <div id="pageContainer" className="eventsPrintPage">
        {tables}
      </div>
    );
  } else if (window.location.pathname == "/printEvent") {
    <div id="pageContainer">
      <EventPrintTable tableData={pageData.table} />
    </div>;
  }

  return <div>{"Hi :)"}</div>;
}
