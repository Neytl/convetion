"use client";
import Stats from "convention/components/Stats";
import Table from "convention/components/Table";
import PageInfo from "convention/components/PageInfo";
import Popup from "convention/components/Popup";

import { useState, useEffect } from "react";
import TableEntry from "./TableEntry";

export default function Content({ setPageSchoolData }) {
  const [viewData, setViewData] = useState({
    tables: [],
  });

  const [pathname, setPathname] = useState("");

  const [schoolID, setSchoolID] = useState("");

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
    if (endpoint == "student") payload.schoolID = schoolID;
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

  const updateDataEntry = (endpoint, primaryKey, payload) => {
    // Make the request
    console.log("Fetch update " + endpoint, payload);

    fetch("https://localhost:44398/api/MiniConvention/" + endpoint, {
      method: "PUT",
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
        console.log(" = Response: ", data);

        // Update the element - update the view data
        let updatedData = structuredClone(viewData);
        let tableData = updatedData.tables[0].tableData;
        let primaryKeyValue = data[primaryKey];

        for (let i = 0; i < tableData.length; i++) {
          if (primaryKeyValue == tableData[i][primaryKey]) {
            // Found the item to edit
            let keys = Object.keys(data);
            let dataEntry = tableData[i];

            keys.forEach((responseKey) => {
              let newValue = data[responseKey];
              if (!!newValue && !Array.isArray(newValue))
                dataEntry[responseKey] = newValue;
            });

            setViewData(updatedData);
            break;
          }
        }
      });

    document.getElementById("popupContainer").classList.add("hidden");
  };

  const popupEvents = {
    postNewData: postNewData,
    updateDataEntry: updateDataEntry,
  };

  useEffect(() => {
    if (!!viewData.stats) return;

    // Pull data from the URL and try to pull the page's school data
    setPathname(window.location.pathname);

    let queryStringSchoolID = new URLSearchParams(window.location.search).get(
      "school"
    );
    setSchoolID(queryStringSchoolID);
    let storedPageSchoolData = JSON.parse(
      sessionStorage.getItem("pageSchoolData")
    );
    let foundPageSchoolData =
      !!storedPageSchoolData &&
      (!queryStringSchoolID ||
        storedPageSchoolData.schoolID == queryStringSchoolID);

    if (foundPageSchoolData) {
      // Storage hit!
      setPageSchoolData(storedPageSchoolData);
    }

    // Request the page data from the database
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
        "https://localhost:44398/api/MiniConvention/schoolStudentsPage/" +
          queryStringSchoolID
      )
        .then((response) => response.json())
        .then((data) => {
          setViewData(data);

          if (!foundPageSchoolData) {
            setPageSchoolData(data.pageSchoolData);
            sessionStorage.setItem(
              "pageSchoolData",
              JSON.stringify(data.pageSchoolData)
            );
          }
        });
    } else {
      // console.log("Loading from JSON...");
      // fetch("./fakeData/" + dataEndpoint + ".json")
      //   .then((response) => response.json())
      //   .then((data) => {
      //     setViewData(data);
      //   });

      console.log("Loading from database...");
      fetch(
        "https://localhost:44398/api/MiniConvention/schoolStudentsPage/" +
          queryStringSchoolID
      )
        .then((response) => response.json())
        .then((data) => {
          setViewData(data);
          if (!foundPageSchoolData) {
            setPageSchoolData(data.pageSchoolData);
            sessionStorage.setItem(
              "pageSchoolData",
              JSON.stringify(data.pageSchoolData)
            );
          }
        });
    }
  }, [viewData, setPageSchoolData]);

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
