"use client";
import Stats from "convention/components/Stats";
import Table from "convention/components/Table";
import PageInfo from "convention/components/PageInfo";
import Popup from "convention/components/Popup";

import { useState, useEffect } from "react";
import TableEntry from "./TableEntry";
import PageButton from "./PageButton";

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

  const deleteParticipant = (payload) => {
    // Remove the element - update the view data
    let updatedData = structuredClone(viewData);

    if (pathname == "/schoolEvents") {
      // Find the table
      for (let i = 0; i < updatedData.tables.length; i++) {
        if (updatedData.tables[i].tableEventID == payload.eventID) {
          let tableData = updatedData.tables[i].tableData;

          // Last participant - delete the table
          if (tableData.length == 1) {
            updatedData.tables.splice(i, 1);
            break;
          }

          // Find the student
          for (let j = 0; j < tableData.length; j++) {
            if (payload.studentID == tableData[j].studentID) {
              // Found the item to delete
              tableData.splice(j, 1);
              break;
            }
          }

          break;
        }
      }
    }

    setViewData(updatedData);

    // Make the delete request
    console.log("Fetch delete participant", payload);
    fetch("https://localhost:44398/api/MiniConvention/participant", {
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

  const deleteDataEntry = (endpoint, payload) => {
    if (endpoint == "participant") {
      deleteParticipant(payload);
      return;
    }

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

  const updateEventParticipants = (eventID, newParticipants) => {
    // Update participants for the given event, add the new table if not already in the list
    let updatedData = structuredClone(viewData);
    let found = false;
    updatedData.tables.forEach((table) => {
      if (found) return;
      if (table.tableEventID == eventID) {
        table.tableData = newParticipants;
        found = true;
      }
    });

    if (!found) {
      let currentEvent = JSON.parse(sessionStorage.getItem("currentEvent"));
      let newTable = {
        columnNames: ["Name", "Age", "Age Group"],
        tableEventID: eventID,
        tableData: newParticipants,
        tableType: "school_event",
        tableName: currentEvent.eventName,
        tableCategory: currentEvent.category,
        maxTeamSize: currentEvent.maxTeamSize,
      };

      found = false;
      for (let i = 0; i < updatedData.tables.length; i++) {
        if (updatedData.tables[i].tableCategory == currentEvent.category) {
          found = true;
          updatedData.tables.splice(i, 0, newTable);
        }
      }

      if (!found) updatedData.tables.unshift(newTable);
    }

    setViewData(updatedData);
  };

  const popupEvents = {
    postNewData: postNewData,
    updateDataEntry: updateDataEntry,
    schoolData: viewData.pageSchoolData,
    updateEventParticipants: updateEventParticipants,
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
      console.log("Loading from database...");
      fetch(
        "https://localhost:44398/api/MiniConvention/schoolEventsPage/" +
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

  // Not yet loaded
  if (viewData.tables.length == 0) {
    return (
      <div id="content">
        <Popup events={popupEvents} />
        <PageInfo pathname={pathname} />
        <Stats statsData={viewData.stats} />
        <div id="tables"></div>
      </div>
    );
  }

  // Build tables
  let tablesContent = [];
  let currentCategory = "";

  viewData.tables.forEach((table) => {
    if (table.tableCategory != currentCategory) {
      currentCategory = table.tableCategory;
      tablesContent.push(
        <div key={currentCategory} className="eventCategoryHeader">
          {currentCategory}
        </div>
      );
    }

    tablesContent.push(
      <Table
        key={table.tableName}
        tableColumns={table.columnNames}
        tableData={table.tableData}
        tableType={table.tableType}
        tableName={table.tableName}
        maxTeamSize={table.maxTeamSize}
        deleteDataEntry={deleteDataEntry}
        tableEventID={table.tableEventID}
      />
    );
  });

  return (
    <div id="content">
      <Popup events={popupEvents} />
      <PageInfo pathname={pathname} />
      <Stats statsData={viewData.stats} />
      <div
        id="tables"
        className={viewData.tables.length > 1 ? "teamEvents" : ""}
      >
        {tablesContent}
      </div>
      <PageButton pathName={pathname} pageData={viewData.pageSchoolData} />
    </div>
  );
}
