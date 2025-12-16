import SimpleImage from "convention/components/generalComponents/SimpleImage";
import IconSpan from "../generalComponents/IconSpan";
import TableEntryButton from "./TableEntryButton";
import "convention/app/css/table.css";
import { openTableButtonPopup } from "../popupComponents/Popup";
import ParticipantIcon from "./ParticipantIcon";
import nextConfig from "convention/../next.config.mjs";
import { goToPage } from "convention/app/library";

export default function TableEntry({
  entryIconSrc,
  data,
  tableType,
  rowIndex,
  deleteDataEntry,
}) {
  let entryID = "entry" + rowIndex;

  switch (tableType) {
    case "admin_schools":
      entryID = "entry" + data.schoolID;
      break;
    case "admin_events":
      entryID = "entry" + data.eventID;
      break;
    case "school_students":
      entryID = "entry" + data.studentID;
      break;
    case "school_event":
    case "school_team_event":
      entryID = "entry" + data.studentID;
      break;
  }

  return (
    <div className="tableEntry closed" id={entryID}>
      {lookupTableEntryData(tableType, data, entryIconSrc, deleteDataEntry)}
      {lookupTableEntryDropdown(tableType, data, deleteDataEntry)}
    </div>
  );
}

function lookupTableEntryData(tableType, data, entryIconSrc, deleteDataEntry) {
  const onclickEntry = (event) => {
    let target = event.target.closest(".tableEntry");

    if (target.classList.toggle("closed")) {
      target.style.height = target.children[0].offsetHeight + "px";
    } else {
      target.style.height =
        target.children[0].offsetHeight +
        target.children[1].offsetHeight +
        "px";
    }
  };

  let columnIndex = 0;

  switch (tableType) {
    case "admin_schools":
      return (
        <div className="tableEntryData" onClick={onclickEntry}>
          <div className="primaryTableEntryData">
            <SimpleImage src={entryIconSrc} width={30} height={30} />
            <span>{data.schoolName}</span>
          </div>
          <span key={columnIndex++}>{data.numStudents}</span>
        </div>
      );
    case "admin_events":
      let teamSizeData = "-";
      let max = parseInt(data.maxTeamSize);
      if (isNaN(max)) max = 1;
      let min = parseInt(data.minTeamSize);
      if (isNaN(min)) min = 1;

      if (max > 1) {
        if (min == max || min < 2) {
          teamSizeData = "(" + max + ")";
        } else {
          teamSizeData = "(" + min + "-" + max + ")";
        }
      } else if (min > 1) {
        teamSizeData = "(" + min + "+)";
      }

      return (
        <div className="tableEntryData" onClick={onclickEntry}>
          <div className="primaryTableEntryData">
            <SimpleImage src={entryIconSrc} width={30} height={30} />
            <span>{data.eventName}</span>
          </div>
          <span key={columnIndex++}>{data.participants.length}</span>
          <span key={columnIndex++}>{teamSizeData}</span>
          <span key={columnIndex++}>{data.category}</span>
        </div>
      );
    case "school_students":
      return (
        <div className="tableEntryData" onClick={onclickEntry}>
          <div className="primaryTableEntryData">
            <SimpleImage src={entryIconSrc} width={30} height={30} />
            <span>{data.fullName}</span>
          </div>
          <span key={columnIndex++}>{data.age}</span>
          <span key={columnIndex++}>
            {data.events.length}
            <SimpleImage src={"/images/event.png"} width={25} height={25} />
          </span>
        </div>
      );
    case "school_event":
    case "school_team_event":
      return (
        <div className="tableEntryData" onClick={() => {}}>
          <div className="primaryTableEntryData">
            <SimpleImage src={entryIconSrc} width={30} height={30} />
            <span>{data.fullName}</span>
          </div>
          <span key={columnIndex++}>{data.age}</span>
          <span key={columnIndex++}>{data.ageGroup}</span>
          <div className="deleteParticipantContainer">
            <div
              className="deleteParticipantButton"
              onClick={() => {
                deleteDataEntry("participant", {
                  studentID: data.studentID,
                  eventID: data.eventID,
                });
              }}
            >
              <SimpleImage src="/images/delete.png" width="20" height="20" />
            </div>
          </div>
        </div>
      );
    default:
      return <div></div>;
  }
}

function lookupTableEntryDropdown(tableType, data, deleteDataEntry) {
  switch (tableType) {
    case "admin_schools":
      return generateAdminSchoolEntryDropdown(tableType, data, deleteDataEntry);
    case "admin_events":
      return generateAdminEventsEntryDropdown(tableType, data, deleteDataEntry);
    case "school_event":
    case "school_team_event":
      return <div></div>;
    case "school_students":
    default:
      return generateSchoolStudentsEntryDropdown(
        tableType,
        data,
        deleteDataEntry
      );
  }
}

function generateAdminSchoolEntryDropdown(tableType, data, deleteDataEntry) {
  const printSchoolData = function () {
    window.open("./imprimirEscuela?school=" + data.schoolID, "_blank");
  };

  const editSchoolData = function () {
    openTableButtonPopup("edit_" + tableType + "_popup");
    let input = document.getElementById("editSchoolName");
    input.value = data.schoolName;
    input.dataset.schoolID = data.schoolID;
  };

  const deleteSchool = function (event) {
    if (
      confirm(
        "¿Estás seguro de que quieres eliminar la escuela '" +
          data.schoolName +
          "' del registro?"
      )
    ) {
      deleteDataEntry("school", {
        schoolID: data.schoolID,
      });
    }
  };

  const viewStudents = function () {
    goToPage("/alumnos?school=" + data.schoolID);
  };

  const viewEvents = function () {
    goToPage("/eventos?school=" + data.schoolID);
  };

  const copyText = () => {
    let image = document.getElementById("copy" + data.schoolID);
    if (image.classList.contains("checked")) return;
    image.classList.add("checked");

    // Copy the text
    let text = "Usuario:     " + data.schoolName + "\r\n";
    text += "Contraseña:  " + data.password;
    navigator.clipboard.writeText(text);

    // Show to the user
    image.srcset = nextConfig.basePath + "/images/checkmark.png";

    setTimeout(() => {
      image.srcset = nextConfig.basePath + "/images/copy.png";
      image.classList.remove("checked");
    }, 1000);
  };

  return (
    <div className="tableEntryDropdown">
      <div className="loginInfoContainer">
        <div className="schoolLoginInfo">
          <IconSpan imageSrc="/images/account.png" text="Usuario:" />
          <span>{data.username}</span>
          <IconSpan imageSrc="/images/password.png" text="Contraseña:" />
          <span>{data.password}</span>
        </div>
        <div
          className="tableEntryButton copyUserInfoButton"
          title="Copiar Información"
          onClick={copyText}
        >
          <SimpleImage
            id={"copy" + data.schoolID}
            src={"/images/copy.png"}
            alt="Copiar"
            width={20}
            height={20}
          />
        </div>
      </div>
      <div className="tableEntryDropdownButtons">
        {data.numStudents == 0 ? null : (
          <TableEntryButton
            imageSrc="/images/print.png"
            text="Imprimir"
            onClick={printSchoolData}
          />
        )}
        <TableEntryButton
          imageSrc="/images/edit.png"
          text="Escuela"
          onClick={editSchoolData}
        />
        <TableEntryButton
          imageSrc="/images/delete.png"
          text="Eliminar"
          onClick={deleteSchool}
        />
        <TableEntryButton
          imageSrc="/images/account.png"
          text="Alumnos"
          onClick={viewStudents}
        />
        {data.numStudents == 0 ? null : (
          <TableEntryButton
            imageSrc="/images/event.png"
            text="Eventos"
            onClick={viewEvents}
          />
        )}
      </div>
    </div>
  );
}

function generateAdminEventsEntryDropdown(tableType, data, deleteDataEntry) {
  const printEvent = function () {
    window.open("./imprimirEvento?event=" + data.eventID, "_blank");
  };

  const editEvent = function () {
    openTableButtonPopup("edit_" + tableType + "_popup");

    let input = document.getElementById("editEventName");
    input.value = data.eventName;
    input.dataset.eventID = data.eventID;

    if (data.isTeamEvent) {
      // Teams
      document.getElementById("editEventHasTeams").checked = true;
      document
        .getElementById("editTeamSizeContainer")
        .classList.remove("hidden");
      document.getElementById("editEventTeamSize").value = parseInt(
        data.maxTeamSize
      );
    } else {
      document.getElementById("editEventHasTeams").checked = false;
      document.getElementById("editTeamSizeContainer").classList.add("hidden");
    }

    document.getElementById("editEventCategory").value = data.category;
  };

  const deleteEvent = function (event) {
    if (
      confirm(
        "¿Estás seguro de que quieres eliminar el evento '" +
          data.eventName +
          "' del registro?"
      )
    ) {
      deleteDataEntry("event", {
        eventID: data.eventID,
      });
    }
  };

  const deleteParticipant = function (participantToDelete) {
    if (
      confirm(
        "¿Estás seguro de que quieres eliminar '" +
          participantToDelete.fullName +
          "' de este evento?"
      )
    ) {
      deleteDataEntry("participant", {
        studentID: participantToDelete.studentID,
        eventID: data.eventID,
      });
    }
  };

  let eventParticipantsElements = [];
  let index = 0;

  // Sort the participants by - age group > school > name
  data.participants.forEach((participant) => {
    if (participant.ageGroup == "Corderitos") participant.sortPriority = 1;
    else if (participant.ageGroup == "Ovejitas") participant.sortPriority = 2;
    else participant.sortPriority = 3;
    participant.sortPriority +=
      "-" + participant.schoolName + participant.fullName;
  });

  data.participants.sort((a, b) =>
    a.sortPriority.localeCompare(b.sortPriority)
  );

  // Display the participants
  let currentAgeGroup = "";
  data.participants.forEach((participant) => {
    index++;

    if (participant.ageGroup != currentAgeGroup) {
      currentAgeGroup = participant.ageGroup;
      eventParticipantsElements.push(
        <div
          className={
            "ageGroupHeader adminEventAgeGroupHeader " + currentAgeGroup
          }
          key={currentAgeGroup}
        >
          {currentAgeGroup}
        </div>
      );
    }

    eventParticipantsElements.push(
      <div
        key={participant.studentID}
        id={participant.studentID + data.eventID}
        className="participantDisplay"
      >
        <ParticipantIcon
          index={index}
          schoolName={participant.schoolName}
          fullName={participant.fullName}
          age={participant.age}
        />
        <div
          className="deleteParticipantButton"
          onClick={() => {
            deleteParticipant(participant);
          }}
        >
          <SimpleImage src="/images/delete.png" width="20" height="20" />
        </div>
      </div>
    );
  });

  return (
    <div className="tableEntryDropdown">
      {eventParticipantsElements.length == 0 ? null : (
        <div className="eventParticipants">{eventParticipantsElements}</div>
      )}
      <div className="tableEntryDropdownButtons">
        {data.participants.length == 0 ? null : (
          <TableEntryButton
            onClick={printEvent}
            imageSrc="/images/print.png"
            text="Imprimir"
          />
        )}
        <TableEntryButton
          onClick={editEvent}
          imageSrc="/images/edit.png"
          text="Evento"
        />
        <TableEntryButton
          onClick={deleteEvent}
          imageSrc="/images/delete.png"
          text="Eliminar"
        />
      </div>
    </div>
  );
}

function generateSchoolStudentsEntryDropdown(tableType, data, deleteDataEntry) {
  let editStudent = function () {
    openTableButtonPopup("edit_" + tableType + "_popup");
    let input = document.getElementById("editFirstName");
    input.value = data.firstNames;
    input.dataset.studentID = data.studentID;
    document.getElementById("editLastName").value = data.lastNames;
    document.getElementById("editBirthdate").value = new Date(
      data.birthdate
    ).toLocaleDateString("es-MX");
  };

  const deleteStudent = function (event) {
    if (
      confirm(
        "¿Estás seguro de que quieres eliminar el alumno '" +
          data.fullName +
          "' del registro?"
      )
    ) {
      deleteDataEntry("student", {
        studentID: data.studentID,
      });
    }
  };

  const deleteParticipant = function (eventToDelete) {
    if (
      confirm(
        "¿Estás seguro de que quieres eliminar '" +
          data.fullName +
          "' del evento '" +
          eventToDelete.eventName +
          "'?"
      )
    ) {
      deleteDataEntry("participant", {
        studentID: data.studentID,
        eventID: eventToDelete.eventID,
      });
    }
  };

  let eventsElements = [];
  let index = 0;

  data.events.forEach((studentEvent) => {
    index++;

    eventsElements.push(
      <div
        key={studentEvent.eventID}
        id={data.studentID + studentEvent.eventID}
        className="participantDisplay"
      >
        <div className="eventListEntry">
          <span className="listNumber">{index + "."}</span>
          <IconSpan
            imageSrc="/images/event.png"
            text={studentEvent.eventName}
          />
        </div>
        <div
          className="deleteParticipantButton"
          onClick={() => {
            deleteParticipant(studentEvent);
          }}
        >
          <SimpleImage src="/images/delete.png" width="20" height="20" />
        </div>
      </div>
    );
  });

  return (
    <div className="tableEntryDropdown">
      {data.events.length == 0 ? null : (
        <div className="eventParticipants">{eventsElements}</div>
      )}
      <div className="tableEntryDropdownButtons">
        <TableEntryButton
          onClick={editStudent}
          imageSrc="/images/edit.png"
          text="Alumno"
        />
        <TableEntryButton
          onClick={deleteStudent}
          imageSrc="/images/delete.png"
          text="Eliminar"
        />
      </div>
    </div>
  );
}
