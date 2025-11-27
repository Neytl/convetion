"use client";
import Stats from "convention/components/pageComponents/Stats";
import Table from "convention/components/tableComponents/Table";
import PageInfo from "convention/components/pageComponents/PageInfo";
import Popup from "convention/components/popupComponents/Popup";
import PageButton from "convention/components/pageComponents/PageButton";

import { useState, useEffect } from "react";

export default function Content({ setPageSchoolData }) {
  useEffect(() => {
    sessionStorage.clear();
    console.log("clear");
  }, []);

  const [viewData, setViewData] = useState({
    tables: [],
  });

  const [pathname, setPathname] = useState("");

  const [schoolID, setSchoolID] = useState("");

  const closeTableEntries = () => {
    let tableEntries = document.getElementById(
      viewData.tables[0].tableName + "TableEntries"
    );
    if (!tableEntries) return;
    Array.from(tableEntries.children).forEach((element) => {
      element.style = "";
      element.classList.add("closed");
    });
  };

  const postNewData = (endpoint, payload) => {
    // Close the table
    closeTableEntries();

    // Make the request
    if (endpoint == "student") {
      payload.schoolID = schoolID;

      // Add a student - update number of students
      if (endpoint == "student") {
        let storedPageSchoolData = JSON.parse(
          localStorage.getItem("pageSchoolData")
        );

        storedPageSchoolData.numStudents++;
        setPageSchoolData(storedPageSchoolData);
        localStorage.setItem(
          "pageSchoolData",
          JSON.stringify(storedPageSchoolData)
        );
      }
    }

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

    document.activeElement.blur();
    document.getElementById("popupContainer").classList.add("hidden");
  };

  const deleteParticipant = (payload) => {
    console.log(payload);

    // Remove the element - update the view data
    let updatedData = structuredClone(viewData);

    if (pathname == "/schoolEvents") {
      // Find the table
      for (let i = 0; i < updatedData.tables.length; i++) {
        if (updatedData.tables[i].tableEventID != payload.eventID) continue;

        // Found the table...
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
    } else if (pathname == "/schoolStudents") {
      // Update the entry height
      document
        .getElementById(payload.studentID + payload.eventID)
        .classList.add("hidden"); // Hide the element to be removed
      let entryElement = document.getElementById("entry" + payload.studentID);

      entryElement.style.height =
        entryElement.children[0].offsetHeight +
        entryElement.children[1].offsetHeight +
        "px";

      // Find the student
      let tableData = updatedData.tables[0].tableData;
      for (let i = 0; i < tableData.length; i++) {
        if (tableData[i].studentID != payload.studentID) continue;

        // Found the student - find the event
        let participationData = tableData[i].events;

        for (let j = 0; j < participationData.length; j++) {
          if (payload.eventID == participationData[j].eventID) {
            // Found the item to delete
            participationData.splice(j, 1);
            break;
          }
        }

        break;
      }
    } else if (pathname == "/adminEvents") {
      // Update the entry height
      document
        .getElementById(payload.studentID + payload.eventID)
        .classList.add("hidden"); // Hide the element to be removed
      let entryElement = document.getElementById("entry" + payload.eventID);

      entryElement.style.height =
        entryElement.children[0].offsetHeight +
        entryElement.children[1].offsetHeight +
        "px";

      // Find the event
      let tableData = updatedData.tables[0].tableData;
      for (let i = 0; i < tableData.length; i++) {
        if (tableData[i].eventID != payload.eventID) continue;

        // Found the event - find the student
        let participationData = tableData[i].participants;

        for (let j = 0; j < participationData.length; j++) {
          if (payload.studentID == participationData[j].studentID) {
            // Found the item to delete
            participationData.splice(j, 1);
            break;
          }
        }

        break;
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

    // Remove a student - update number of students
    if (endpoint == "student") {
      let storedPageSchoolData = JSON.parse(
        localStorage.getItem("pageSchoolData")
      );

      storedPageSchoolData.numStudents--;
      setPageSchoolData(storedPageSchoolData);
      localStorage.setItem(
        "pageSchoolData",
        JSON.stringify(storedPageSchoolData)
      );
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

    document.activeElement.blur();
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
        tableEventID: eventID,
        tableData: newParticipants,
        tableType: currentEvent.isTeamEvent
          ? "school_team_event"
          : "school_event",
        tableName: currentEvent.eventName,
        tableCategory: currentEvent.category,
        maxTeamSize: currentEvent.maxTeamSize,
      };

      found = false;
      for (let i = 0; i < updatedData.tables.length; i++) {
        if (updatedData.tables[i].tableCategory == currentEvent.category) {
          found = true;
          updatedData.tables.splice(i, 0, newTable);
          break;
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
    pageTables: viewData.tables,
  };

  useEffect(() => {
    if (!!viewData.stats) return;

    // Pull data from the URL and try to pull the page's school data
    setPathname(window.location.pathname);

    if (
      window.location.pathname == "/" ||
      window.location.pathname == "/adminEvents"
    ) {
      document.getElementById("page").classList.add("adminPage");
    }

    let queryStringSchoolID = new URLSearchParams(window.location.search).get(
      "school"
    );
    setSchoolID(queryStringSchoolID);
    let storedPageSchoolData = JSON.parse(
      localStorage.getItem("pageSchoolData")
    );
    let foundPageSchoolData =
      !!storedPageSchoolData &&
      (!queryStringSchoolID ||
        storedPageSchoolData.schoolID == queryStringSchoolID);

    if (foundPageSchoolData) {
      // Storage hit!
      setPageSchoolData(storedPageSchoolData);
    }
    const updateSchoolData = (newData) => {
      localStorage.setItem("pageSchoolData", JSON.stringify(newData));
      setPageSchoolData(newData);
    };

    // Request the page data from the database
    console.log("Loading from database...");

    if (window.location.pathname == "/") {
      fetch("https://localhost:44398/api/MiniConvention/adminSchoolsPage")
        .then((response) => response.json())
        .then((data) => {
          setViewData(data);
        });
    } else if (window.location.pathname == "/adminEvents") {
      fetch("https://localhost:44398/api/MiniConvention/adminEventsPage")
        .then((response) => response.json())
        .then((data) => {
          setViewData(data);
        });
    } else if (window.location.pathname == "/schoolStudents") {
      fetch(
        "https://localhost:44398/api/MiniConvention/schoolStudentsPage/" +
          queryStringSchoolID
      )
        .then((response) => response.json())
        .then((data) => {
          setViewData(data);
          updateSchoolData(data.pageSchoolData);
        });
    } else {
      fetch(
        "https://localhost:44398/api/MiniConvention/schoolEventsPage/" +
          queryStringSchoolID
      )
        .then((response) => response.json())
        .then((data) => {
          setViewData(data);
          updateSchoolData(data.pageSchoolData);
        });
    }
  }, [viewData, setPageSchoolData]);

  // Not yet loaded/no tables
  if (viewData.tables.length == 0) {
    return (
      <div id="content">
        <Popup events={popupEvents} pathname={pathname} />
        <PageInfo pathname={pathname} />
        <Stats statsData={viewData.stats} />
        <div id="tables"></div>
        <PageButton pathName={pathname} pageData={viewData.pageSchoolData} />
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
        tableData={table.tableData}
        tableType={table.tableType}
        tableName={table.tableName}
        maxTeamSize={table.maxTeamSize}
        deleteDataEntry={deleteDataEntry}
        tableObject={table}
        pageTables={viewData.tables}
      />
    );
  });

  return (
    <div id="content">
      <Popup events={popupEvents} pathname={pathname} />
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
