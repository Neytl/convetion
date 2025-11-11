"use client";
import Stats from "convention/components/Stats";
import Table from "convention/components/Table";
import PageInfo from "convention/components/PageInfo";
import Popup from "convention/components/Popup";

import { useState, useEffect } from "react";

export default function Content({ dataEndpoint }) {
  const [viewData, setViewData] = useState({
    tables: [],
  });

  const [pathname, setPathname] = useState("");

  const addSchoolDataEntry = (schoolData) => {
    let updatedData = structuredClone(viewData);

    Array.from(document.getElementById("SchoolsTableEntries").children).forEach(
      (element) => {
        element.style = "";
        element.classList.add("closed");
      }
    );

    updatedData.tables[0].tableData.unshift(schoolData);
    updatedData.stats[0].value++;
    setViewData(updatedData);
  };

  const popupEvents = {
    addSchoolDataEntry: addSchoolDataEntry,
  };

  useEffect(() => {
    if (!!viewData.stats) return;
    setPathname(window.location.pathname);

    if (window.location.pathname == "/") {
      console.log("Loading from database...");
      fetch("https://localhost:44398/api/MiniConvention/adminSchoolsPage")
        .then((response) => response.json())
        .then((data) => {
          setViewData(data);
        });
    } else if (window.location.pathname == "/adminEvents") {
      console.log("Loading from database...");
      fetch("https://localhost:44398/api/MiniConvention/adminEventsPage")
        .then((response) => response.json())
        .then((data) => {
          setViewData(data);
        });
    } else if (window.location.pathname == "/schoolStudents") {
      console.log("Loading from database...");
      fetch(
        "https://localhost:44398/api/MiniConvention/schoolStudentsPage/07e98351-dec7-403b-8ecb-e461f12ffdd4"
      )
        .then((response) => response.json())
        .then((data) => {
          setViewData(data);
        });
    } else {
      console.log("Loading from JSON...");
      fetch("./fakeData/" + dataEndpoint + ".json")
        .then((response) => response.json())
        .then((data) => {
          setViewData(data);
        });
    }
  }, [viewData, dataEndpoint]);

  return (
    <div id="content">
      <Popup events={popupEvents} />
      <PageInfo pathname={pathname} />
      <Stats statsData={viewData.stats} />
      <div id="tables">
        {viewData.tables.map((table) => (
          <Table
            key={table.tableName}
            tableColumns={table.columnNames}
            tableData={table.tableData}
            tableType={table.tableType}
            tableName={table.tableName}
            maxTeamSize={table.maxTeamSize}
          />
        ))}
      </div>
    </div>
  );
}
