// import SimpleImage from "convention/components/generalComponents/SimpleImage";
import { useEffect, useState } from "react";
import TinyImage from "./TinyImage";
import { setUpEditSchoolEventPopup } from "./EditSchoolEventPopup";
import {
  getLoggedInUserHeaders,
  notAuthorized,
} from "../pageComponents/Content";

export default function AddSchoolEventPopup(pageTables) {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // Break out if fetch already in progress
    if (!!sessionStorage.getItem("loadedEvents")) return;
    sessionStorage.setItem("loadedEvents", true);

    // Fetch the list of events
    fetch(
      "https://mini-convention-beedavbxfwa0fdcj.mexicocentral-01.azurewebsites.net/api/MiniConvention/events",
      getLoggedInUserHeaders()
    )
      .then((response) => response.json())
      .then((data) => {
        if (notAuthorized(data)) return;
        setEvents(data);
      });
  }, []);

  let popupElements = [];
  let currentCategory;

  events.forEach((event) => {
    if (event.category != currentCategory) {
      currentCategory = event.category;
      popupElements.push(
        <div className="eventCategoryPopupHeader" key={currentCategory}>
          {currentCategory}
        </div>
      );
    }

    popupElements.push(
      <div
        key={event.eventID}
        className="eventLink"
        onClick={() => {
          let tables = pageTables.pageTables;

          // Load in current event data
          let currentStudentList;

          for (let i = 0; i < tables.length; i++) {
            if (tables[i].tableEventID == event.eventID) {
              currentStudentList = structuredClone(tables[i].tableData);
              break;
            }
          }

          if (!currentStudentList) currentStudentList = [];

          // Set up the edit event popup
          setUpEditSchoolEventPopup(currentStudentList, event, null, tables);
          document.getElementById("popupTitle").innerHTML = event.eventName;

          // Show the new popup
          document
            .getElementById("add_school_event_popup")
            .classList.add("hidden");
          document
            .getElementById("school_event_popup")
            .classList.remove("hidden");
        }}
      >
        <TinyImage imageSrc="event.png" />
        <div>{event.eventName}</div>
      </div>
    );
  });

  return (
    <div id="add_school_event_popup" className="hidden">
      <form className="popupFields" id="eventsListConatiner">
        {popupElements}
      </form>
    </div>
  );
}
