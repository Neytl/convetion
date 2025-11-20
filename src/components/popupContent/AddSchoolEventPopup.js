// import Image from "next/image";
import { useEffect, useState } from "react";
import TinyImage from "./TinyImage";
import { setUpEditSchoolEventPopup } from "./EditSchoolEventPopup";

export default function AddSchoolEventPopup() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch("https://localhost:44398/api/MiniConvention/events")
      .then((response) => response.json())
      .then((data) => {
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
          // Load in current event data
          let currentStudentList = JSON.parse(
            sessionStorage.getItem(event.eventID)
          );
          if (!currentStudentList) currentStudentList = [];

          // Set up the edit event popup
          setUpEditSchoolEventPopup(currentStudentList, event);
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
