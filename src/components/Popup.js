import "convention/app/css/popup.css";
import AddSchoolPopup from "./popupContent/AddSchoolPopup";
import { clearSchoolPopup } from "./popupContent/AddSchoolPopup";
import EditSchoolPopup from "./popupContent/EditSchoolPopup";
import AddEventPopup from "./popupContent/AddEventPopup";
import { clearEventPopup } from "./popupContent/AddEventPopup";
import EditAdminEventPopup from "./popupContent/EditAdminEventPopup";
import AddStudentPopup from "./popupContent/AddStudentPopup";
import { clearStudentPopup } from "./popupContent/AddStudentPopup";
import EditStudentPopup from "./popupContent/EditStudentPopup";
import Image from "next/image";
import EditSchoolEventPopup from "./popupContent/EditSchoolEventPopup";
import { setUpEditSchoolEventPopup } from "./popupContent/EditSchoolEventPopup";
import AddSchoolEventPopup from "./popupContent/AddSchoolEventPopup";

export default function Popup({ events }) {
  const closePopup = (event) => {
    if (
      event.target.closest("#closePopupButton") == null &&
      event.target.closest("#popup") != null
    )
      return;
    document.getElementById("popupContainer").classList.add("hidden");
  };

  return (
    <div id="popupContainer" onClick={closePopup} className="hidden">
      <div id="popup">
        <div id="closePopupButton" onClick={closePopup}>
          <span>&times;</span>
        </div>
        <div id="popupHeader">
          <Image
            src={"/images/event.png"}
            alt=""
            width={30}
            height={30}
            id="popupHeaderIcon"
          />
          <div id="popupTitle">Title</div>
        </div>
        <div id="popupContent">
          <AddSchoolPopup postNewData={events.postNewData} />
          <EditSchoolPopup updateDataEntry={events.updateDataEntry} />
          <AddEventPopup postNewData={events.postNewData} />
          <EditAdminEventPopup updateDataEntry={events.updateDataEntry} />
          <AddStudentPopup postNewData={events.postNewData} />
          <EditStudentPopup updateDataEntry={events.updateDataEntry} />
          <EditSchoolEventPopup
            schoolData={events.schoolData}
            updateEventParticipants={events.updateEventParticipants}
          />
          <AddSchoolEventPopup />
        </div>
      </div>
    </div>
  );
}

export const openTableButtonPopup = (
  popupName,
  tableName,
  tableData,
  tableObject
) => {
  // Show the correct popup
  document
    .getElementById("popupContent")
    .childNodes.forEach((element) => element.classList.add("hidden"));

  console.log(popupName);

  switch (popupName) {
    case "admin_schools_popup":
      document.getElementById("popupTitle").innerHTML = "New School";
      document.getElementById("popupHeaderIcon").srcset = "/images/school.png";
      clearSchoolPopup();
      break;
    case "edit_admin_schools_popup":
      document.getElementById("popupTitle").innerHTML = "Edit School";
      document.getElementById("popupHeaderIcon").srcset = "/images/school.png";
      break;
    case "admin_events_popup":
      document.getElementById("popupTitle").innerHTML = "New Event";
      document.getElementById("popupHeaderIcon").srcset = "/images/event.png";
      clearEventPopup();
      break;
    case "edit_admin_events_popup":
      document.getElementById("popupTitle").innerHTML = "Edit Event";
      document.getElementById("popupHeaderIcon").srcset = "/images/event.png";
      break;
    case "school_students_popup":
      document.getElementById("popupTitle").innerHTML = "Add Student";
      document.getElementById("popupHeaderIcon").srcset = "/images/account.png";
      clearStudentPopup();
      break;
    case "edit_school_students_popup":
      document.getElementById("popupTitle").innerHTML = "Edit Student";
      document.getElementById("popupHeaderIcon").srcset = "/images/account.png";
      break;
    case "school_event_popup":
    case "school_team_event_popup":
      popupName = "school_event_popup";
      document.getElementById("popupTitle").innerHTML = tableName;
      document.getElementById("popupHeaderIcon").srcset = "/images/event.png";
      setUpEditSchoolEventPopup(structuredClone(tableData), {
        eventID: tableObject.tableEventID,
        isTeamEvent: tableObject.tableType == "school_team_event",
        maxTeamSize: tableObject.maxTeamSize,
      });
      break;
    default:
      console.log("Error opening a popup!", popupName);
      return;
  }

  document.getElementById(popupName).classList.remove("hidden");

  // Show the popup
  document.getElementById("popupContainer").classList.remove("hidden");
};
