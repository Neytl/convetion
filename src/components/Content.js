"use client";
import Stats from "convention/components/Stats";
import Table from "convention/components/Table";
import PageInfo from "convention/components/PageInfo";
import Popup from "convention/components/Popup";

import { useState, useEffect } from "react";
import TableEntry from "./TableEntry";

export default function Content({ dataEndpoint }) {
  const [viewData, setViewData] = useState({
    tables: [],
  });

  const [pathname, setPathname] = useState("");

  const closeTableEntries = () => {
    Array.from(
      document.getElementById(viewData.tables[0].tableName + "TableEntries")
        .children
    ).forEach((element) => {
      element.style = "";
      element.classList.add("closed");
    });
  };

  const postNewData = (endpoint, payload) => {
    // Close the table
    closeTableEntries();

    // Make the request
    console.log("Fetch add " + endpoint, payload);

    fetch("https://localhost:44398/api/MiniConvention/" + endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify(payload),
    })
      .then((response) => {
        if (!!response.status && response.status == 400) {
          console.log("Bad request");
          return null;
        }

        return response.json();
      })
      .then((data) => {
        if (!data) return;
        let updatedData = structuredClone(viewData);
        updatedData.tables[0].tableData.unshift(data);
        updatedData.stats[0].value++;
        setViewData(updatedData);
      });

    document.getElementById("popupContainer").classList.add("hidden");
  };

  const deleteDataEntry = (endpoint, payload) => {
    // Close all open elements
    closeTableEntries();

    // Remove the element - update the view data
    let updatedData = structuredClone(viewData);
    let key = Object.keys(payload)[0];
    let value = payload[key];
    let tableData = updatedData.tables[0].tableData;

    for (let i = 0; i < tableData.length; i++) {
      if (value == tableData[i][key]) {
        // Found the item to delete
        tableData.splice(i, 1);
        updatedData.stats[0].value--;
        setViewData(updatedData);
        break;
      }
    }

    // Make the delete request
    console.log("Fetch delete " + endpoint, payload);
    fetch("https://localhost:44398/api/MiniConvention/" + endpoint, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify(payload),
    })
      .then((response) => {
        if (!!response.status && response.status == 400) {
          console.log("Bad request");
          return null;
        }

        return response.json();
      })
      .then((data) => {
        if (!!data) console.log(" = Response: ", data);
      });
  };

  const popupEvents = {
    postNewData: postNewData,
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
            deleteDataEntry={deleteDataEntry}
          />
        ))}
      </div>
    </div>
  );
}
