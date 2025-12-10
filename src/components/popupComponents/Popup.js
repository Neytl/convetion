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
import SimpleImage from "convention/components/generalComponents/SimpleImage";
import EditSchoolEventPopup from "./EditSchoolEventPopup";
import { setUpEditSchoolEventPopup } from "./EditSchoolEventPopup";
import AddSchoolEventPopup from "./AddSchoolEventPopup";

export default function Popup({ events, pathname }) {
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
          <SimpleImage
            src={"/images/event.png"}
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

const closePopup = (event) => {
  if (
    !!event &&
    event.target.closest("#closePopupButton") == null &&
    event.target.closest("#popup") != null
  )
    return;

  // Close the popup
  document.activeElement.blur();
  document.getElementById("popupContainer").classList.add("hidden");
};

export const onPopupInput = (event) => {
  // Close the popup
  if (event.code == "Escape") {
    closePopup();
    return;
  }

  // Submit popup or click checkbox
  if (
    event.code == "Enter" &&
    (event.target.classList.contains("submitPopupButton") ||
      event.target.classList.contains("slider"))
  ) {
    event.preventDefault();
    event.target.click();
    return;
  }

  // Tab next
  if (event.code == "Tab" || event.code == "Enter") {
    event.preventDefault();
    let newTarget;
    let currentTab = event.target.dataset.tab;
    let currentLetter = currentTab[0];

    if (event.target.classList.contains("submitPopupButton")) {
      // Tab back to first element
      newTarget = document.querySelector('[data-tab="' + currentLetter + '1"]');
      newTarget.focus();
    } else {
      // Tab to next element
      let currentIndex = parseInt(currentTab[1]);
      let newIndex = currentIndex + 1 + "";
      newTarget = document.querySelector(
        '[data-tab="' + currentLetter + newIndex + '"]'
      );

      newTarget.focus();

      // Unable to focus - tab next
      if (newTarget != document.activeElement) {
        let newIndex = currentIndex + 2 + "";
        newTarget = document.querySelector(
          '[data-tab="' + currentLetter + newIndex + '"]'
        );

        newTarget.focus();
      }
    }
  }
};

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

  document.querySelectorAll(".error").forEach((element) => {
    element.classList.remove("error");
  });

  console.log(popupName);

  switch (popupName) {
    case "admin_schools_popup":
      document.getElementById("popupTitle").innerHTML = "Registrar Escuela";
      document.getElementById("popupHeaderIcon").srcset = "/images/school.png";
      clearSchoolPopup();
      break;
    case "edit_admin_schools_popup":
      document.getElementById("popupTitle").innerHTML = "Editar Escuela";
      document.getElementById("popupHeaderIcon").srcset = "/images/school.png";
      break;
    case "admin_events_popup":
      document.getElementById("popupTitle").innerHTML = "Registrar Evento";
      document.getElementById("popupHeaderIcon").srcset = "/images/event.png";
      clearEventPopup();
      break;
    case "edit_admin_events_popup":
      document.getElementById("popupTitle").innerHTML = "Editar Evento";
      document.getElementById("popupHeaderIcon").srcset = "/images/event.png";
      break;
    case "school_students_popup":
      document.getElementById("popupTitle").innerHTML = "Registrar Alumno";
      document.getElementById("popupHeaderIcon").srcset = "/images/account.png";
      clearStudentPopup();
      break;
    case "edit_school_students_popup":
      document.getElementById("popupTitle").innerHTML = "Editar Alumno";
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
