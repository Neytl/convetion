import "convention/app/css/popup.css";
import AddSchoolPopup from "./AddSchoolPopup";
import { clearSchoolPopup } from "./AddSchoolPopup";
import EditSchoolPopup from "./EditSchoolPopup";
import AddEventPopup from "./AddEventPopup";
import { clearEventPopup } from "./AddEventPopup";
import EditAdminEventPopup from "./EditAdminEventPopup";
import AddStudentPopup from "./AddStudentPopup";
import { clearStudentPopup } from "./AddStudentPopup";
import EditStudentPopup from "./EditStudentPopup";
import Image from "next/image";
import EditSchoolEventPopup from "./EditSchoolEventPopup";
import { setUpEditSchoolEventPopup } from "./EditSchoolEventPopup";
import AddSchoolEventPopup from "./AddSchoolEventPopup";

export default function Popup({ events, pathname }) {
  const closePopup = (event) => {
    if (
      event.target.closest("#closePopupButton") == null &&
      event.target.closest("#popup") != null
    )
      return;
    document.getElementById("popupContainer").classList.add("hidden");
  };

  // Load in the correct popups
  let popups = [];

  if (pathname == "/") {
    popups.push(
      <AddSchoolPopup key={"AddSchoolPopup"} postNewData={events.postNewData} />
    );
    popups.push(
      <EditSchoolPopup
        key={"EditSchoolPopup"}
        updateDataEntry={events.updateDataEntry}
      />
    );
  } else if (pathname == "/adminEvents") {
    popups.push(
      <AddEventPopup key={"AddEventPopup"} postNewData={events.postNewData} />
    );
    popups.push(
      <EditAdminEventPopup
        key={"EditAdminEventPopup"}
        updateDataEntry={events.updateDataEntry}
      />
    );
  } else if (pathname == "/schoolStudents") {
    popups.push(
      <AddStudentPopup
        key={"AddStudentPopup"}
        postNewData={events.postNewData}
      />
    );
    popups.push(
      <EditStudentPopup
        key={"AddScEditStudentPopuphoolPopup"}
        updateDataEntry={events.updateDataEntry}
      />
    );
  } else if (pathname == "/schoolEvents") {
    popups.push(
      <EditSchoolEventPopup
        key={"EditSchoolEventPopup"}
        schoolData={events.schoolData}
        updateEventParticipants={events.updateEventParticipants}
      />
    );
    popups.push(
      <AddSchoolEventPopup
        key={"AddSchoolEventPopup"}
        pageTables={events.pageTables}
      />
    );
  }

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
        <div id="popupContent">{popups}</div>
      </div>
    </div>
  );
}

export const openTableButtonPopup = (
  popupName,
  tableName,
  tableData,
  tableObject,
  teamToOpen,
  pageTables
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
      setUpEditSchoolEventPopup(
        structuredClone(tableData),
        {
          eventID: tableObject.tableEventID,
          isTeamEvent: tableObject.tableType == "school_team_event",
          maxTeamSize: tableObject.maxTeamSize,
        },
        teamToOpen,
        pageTables
      );
      break;
    default:
      console.log("Error opening a popup!", popupName);
      return;
  }

  document.getElementById(popupName).classList.remove("hidden");

  // Show the popup
  document.getElementById("popupContainer").classList.remove("hidden");
};
