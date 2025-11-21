import Image from "next/image";
import IconSpan from "./IconSpan";
import TableEntryButton from "./TableEntryButton";
import "convention/app/css/table.css";
import { openTableButtonPopup } from "./Popup";

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
            <Image src={entryIconSrc} alt="" width={30} height={30} />
            <span>{data.schoolName}</span>
          </div>
          <span key={columnIndex++}>{data.numStudents}</span>
        </div>
      );
    case "admin_events":
      return (
        <div className="tableEntryData" onClick={onclickEntry}>
          <div className="primaryTableEntryData">
            <Image src={entryIconSrc} alt="" width={30} height={30} />
            <span>{data.eventName}</span>
          </div>
          <span key={columnIndex++}>{data.participants.length}</span>
          <span key={columnIndex++}>
            {data.isTeamEvent ? data.maxTeamSize : "-"}
          </span>
          <span key={columnIndex++}>{data.category}</span>
        </div>
      );
    case "school_students":
      return (
        <div className="tableEntryData" onClick={onclickEntry}>
          <div className="primaryTableEntryData">
            <Image src={entryIconSrc} alt="" width={30} height={30} />
            <span>{data.fullName}</span>
          </div>
          <span key={columnIndex++}>{data.age}</span>
          <span key={columnIndex++}>{data.ageGroup}</span>
          <span key={columnIndex++}>{data.events.length}</span>
        </div>
      );
    case "school_event":
    case "school_team_event":
      return (
        <div className="tableEntryData" onClick={() => {}}>
          <div className="primaryTableEntryData">
            <Image src={entryIconSrc} alt="" width={30} height={30} />
            <span>{data.fullName}</span>
          </div>
          <span key={columnIndex++}>{data.age}</span>
          <span key={columnIndex++}>{data.ageGroup}</span>
          <div className="deleteParticipantContainer">
            <Image
              className="deleteParticipantButton"
              src="/images/delete.png"
              alt=""
              width="20"
              height="20"
              onClick={() => {
                deleteDataEntry("participant", {
                  studentID: data.studentID,
                  eventID: data.eventID,
                  // teamNumber: data.teamNumber,
                });
              }}
            />
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
  let printSchoolData = function () {
    // TODO
    console.log("Printing out '" + data.schoolName + "' school data...");
  };

  let editSchoolData = function () {
    openTableButtonPopup("edit_" + tableType + "_popup");
    let input = document.getElementById("editSchoolName");
    input.value = data.schoolName;
    input.dataset.schoolID = data.schoolID;
  };

  let deleteSchool = function (event) {
    if (confirm("Are you sure you want to delete '" + data.schoolName + "'?")) {
      deleteDataEntry("school", {
        schoolID: data.schoolID,
      });
    }
  };

  let viewStudents = function () {
    window.location.href = "./schoolStudents?school=" + data.schoolID;
  };

  let viewEvents = function () {
    window.location.href = "./schoolEvents?school=" + data.schoolID;
  };

  return (
    <div className="tableEntryDropdown">
      <div className="loginInfoContainer">
        <div className="schoolLoginInfo">
          <IconSpan imageSrc="/images/account.png" text="Username:" />
          <span>{data.username}</span>
          <IconSpan imageSrc="/images/password.png" text="Password:" />
          <span>{data.password}</span>
        </div>
      </div>
      <div className="tableEntryDropdownButtons">
        <TableEntryButton
          imageSrc="/images/print.png"
          text="Print"
          onClick={printSchoolData}
        />
        <TableEntryButton
          imageSrc="/images/edit.png"
          text="Edit"
          onClick={editSchoolData}
        />
        <TableEntryButton
          imageSrc="/images/delete.png"
          text="Delete"
          onClick={deleteSchool}
        />
        <TableEntryButton
          imageSrc="/images/account.png"
          text="Students"
          onClick={viewStudents}
        />
        <TableEntryButton
          imageSrc="/images/event.png"
          text="Events"
          onClick={viewEvents}
        />
      </div>
    </div>
  );
}

function generateAdminEventsEntryDropdown(tableType, data, deleteDataEntry) {
  let printEvent = function () {
    // TODO
    console.log("Printing out '" + data.eventName + "' event data...");
  };

  let editEvent = function () {
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

  let deleteEvent = function (event) {
    if (confirm("Are you sure you want to delete '" + data.eventName + "'?")) {
      deleteDataEntry("event", {
        eventID: data.eventID,
      });
    }
  };

  let deleteParticipant = function (participantToDelete) {
    deleteDataEntry("participant", {
      studentID: participantToDelete,
      eventID: data.eventID,
    });
  };

  let eventParticipantsElements = [];

  data.participants.forEach((participant) => {
    eventParticipantsElements.push(
      <div
        key={participant.studentID}
        id={participant.studentID + data.eventID}
      >
        <IconSpan
          imageSrc="/images/account.png"
          text={participant.fullName + " - " + participant.schoolName}
        />
        <Image
          className="deleteParticipantButton"
          src="/images/delete.png"
          alt=""
          width="20"
          height="20"
          onClick={() => {
            deleteParticipant(participant.studentID);
          }}
        />
      </div>
    );
  });

  return (
    <div className="tableEntryDropdown">
      <div className="eventParticipants">{eventParticipantsElements}</div>
      <div className="tableEntryDropdownButtons">
        <TableEntryButton
          onClick={printEvent}
          imageSrc="/images/print.png"
          text="Print"
        />
        <TableEntryButton
          onClick={editEvent}
          imageSrc="/images/edit.png"
          text="Edit"
        />
        <TableEntryButton
          onClick={deleteEvent}
          imageSrc="/images/delete.png"
          text="Delete"
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
    document.getElementById("editBirthdate").value = data.birthdate;
  };

  let deleteStudent = function (event) {
    if (confirm("Are you sure you want to delete '" + data.fullName + "'?")) {
      deleteDataEntry("student", {
        studentID: data.studentID,
      });
    }
  };

  let deleteParticipant = function (eventToDelete) {
    deleteDataEntry("participant", {
      studentID: data.studentID,
      eventID: eventToDelete,
    });
  };

  let eventsElements = [];

  data.events.forEach((studentEvent) => {
    eventsElements.push(
      <div
        key={studentEvent.eventID}
        id={data.studentID + studentEvent.eventID}
      >
        <IconSpan imageSrc="/images/event.png" text={studentEvent.eventName} />
        <Image
          className="deleteParticipantButton"
          src="/images/delete.png"
          alt=""
          width="20"
          height="20"
          onClick={() => {
            deleteParticipant(studentEvent.eventID);
          }}
        />
      </div>
    );
  });

  return (
    <div className="tableEntryDropdown">
      <div className="eventParticipants">{eventsElements}</div>
      <div className="tableEntryDropdownButtons">
        <TableEntryButton
          onClick={editStudent}
          imageSrc="/images/edit.png"
          text="Student"
        />
        <TableEntryButton
          onClick={deleteStudent}
          imageSrc="/images/delete.png"
          text="Delete"
        />
      </div>
    </div>
  );
}
