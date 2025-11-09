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
}) {
  return (
    <div className="tableEntry closed" id={"entry" + rowIndex}>
      {lookupTableEntryData(tableType, data, entryIconSrc)}
      {lookupTableEntryDropdown(tableType, data, rowIndex)}
    </div>
  );
}

function lookupTableEntryData(tableType, data, entryIconSrc) {
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
          <span key={columnIndex++}>{data.teamSize}</span>
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
        <div className="tableEntryData" onClick={onclickEntry}>
          <div className="primaryTableEntryData">
            <Image src={entryIconSrc} alt="" width={30} height={30} />
            <span>{data.fullName}</span>
          </div>
          <span key={columnIndex++}>{data.ageGroup}</span>
          <span key={columnIndex++}>{data.age}</span>
        </div>
      );
    default:
      return <div></div>;
  }
}

function lookupTableEntryDropdown(tableType, data, rowIndex) {
  switch (tableType) {
    case "admin_schools":
      return generateAdminSchoolEntryDropdown(tableType, data, rowIndex);
    case "admin_events":
      return generateAdminEventsEntryDropdown(tableType, data, rowIndex);
    case "school_event":
    case "school_team_event":
      return generateSchoolEventsEntryDropdown(tableType, data, rowIndex);
    case "school_students":
    default:
      return generateSchoolStudentsEntryDropdown(tableType, data, rowIndex);
  }
}

function generateAdminSchoolEntryDropdown(tableType, data, rowIndex) {
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
      let body = {
        schoolID: data.schoolID,
      };
      console.log("Fetch Delete School", body);

      let elementToDelete = document.getElementById("entry" + rowIndex);
      console.log("entry" + rowIndex, elementToDelete);
      elementToDelete.parentElement.removeChild(elementToDelete);
    }
  };

  let viewStudents = function () {
    // TODO - link to the right school
    window.location.href = "./schoolStudents";
  };

  return (
    <div className="tableEntryDropdown">
      <div className="schoolLoginInfo">
        <IconSpan imageSrc="/images/account.png" text="Username:" />
        <span>{data.username}</span>
        <IconSpan imageSrc="/images/password.png" text="Password:" />
        <span>{data.password}</span>
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
      </div>
    </div>
  );
}

function generateAdminEventsEntryDropdown(tableType, data, columnIndex) {
  let printEvent = function () {
    // TODO
    console.log("Printing out '" + data.eventName + "' event data...");
  };

  let editEvent = function () {
    openTableButtonPopup("edit_" + tableType + "_popup");

    let input = document.getElementById("editEventName");
    input.value = data.eventName;
    input.dataset.eventID = data.eventID;

    if (data.teamSize != "-") {
      // Teams
      document.getElementById("editEventHasTeams").checked = true;
      document
        .getElementById("editTeamSizeContainer")
        .classList.remove("hidden");
      document.getElementById("editEventTeamSize").value = parseInt(
        data.teamSize
      );
    } else {
      document.getElementById("editEventHasTeams").checked = false;
      document.getElementById("editTeamSizeContainer").classList.add("hidden");
    }

    document.getElementById("editEventCategory").value = data.category;
  };

  let deleteEvent = function (event) {
    if (confirm("Are you sure you want to delete '" + data.eventName + "'?")) {
      let body = {
        eventName: data.eventName,
      };
      console.log("Fetch Delete Event", body);

      let elementToDelete = document.getElementById("entry" + columnIndex);
      elementToDelete.parentElement.removeChild(elementToDelete);
    }
  };

  let deleteParticipant = function (event, participantToDelete) {
    let body = {
      participantID: participantToDelete,
      eventID: data.eventID,
    };

    console.log("Fetch Delete Participant", body);

    // Delete the participant element
    let elementToDelete = event.target.parentElement;
    let entryElement =
      elementToDelete.parentElement.parentElement.parentElement;
    elementToDelete.parentElement.removeChild(elementToDelete);

    // Update the height and update the # of events
    entryElement.style.height =
      entryElement.children[0].offsetHeight +
      entryElement.children[1].offsetHeight +
      "px";

    let eventNumberElement = entryElement.children[0].children[1];
    eventNumberElement.innerHTML = parseInt(eventNumberElement.innerHTML) - 1;
  };

  let eventParticipantsElements = [];

  data.participants.forEach((participant) => {
    eventParticipantsElements.push(
      <div key={participant.studentID}>
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
          onClick={(event) => {
            deleteParticipant(event, participant.studentID);
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

function generateSchoolStudentsEntryDropdown(tableType, data, columnIndex) {
  let editStudent = function () {
    openTableButtonPopup("edit_" + tableType + "_popup");
    let input = document.getElementById("editFirstName");
    input.value = data.firstNames;
    input.dataset.studentID = data.studentID;
    document.getElementById("editLastName").value = data.lastNames;
    document.getElementById("editBirthdate").value = "";
  };

  let deleteStudent = function (event) {
    if (confirm("Are you sure you want to delete '" + data.fullName + "'?")) {
      let body = {
        studentID: data.studentID,
      };
      console.log("Fetch Delete Student", body);

      let elementToDelete = document.getElementById("entry" + columnIndex);
      elementToDelete.parentElement.removeChild(elementToDelete);
    }
  };

  let deleteParticipant = function (event, eventToDelete) {
    let body = {
      participantID: data.studentID,
      eventID: eventToDelete,
    };

    console.log("Fetch Delete Participant", body);

    // Delete the participant element
    let elementToDelete = event.target.parentElement;
    let entryElement =
      elementToDelete.parentElement.parentElement.parentElement;
    elementToDelete.parentElement.removeChild(elementToDelete);

    // Update the height and update the # of events
    entryElement.style.height =
      entryElement.children[0].offsetHeight +
      entryElement.children[1].offsetHeight +
      "px";

    let eventNumberElement = entryElement.children[0].children[3];
    eventNumberElement.innerHTML = parseInt(eventNumberElement.innerHTML) - 1;
  };

  let eventsElements = [];

  data.events.forEach((studentEvent) => {
    eventsElements.push(
      <div key={studentEvent.eventID}>
        <IconSpan imageSrc="/images/event.png" text={studentEvent.eventName} />
        <Image
          className="deleteParticipantButton"
          src="/images/delete.png"
          alt=""
          width="20"
          height="20"
          onClick={(event) => {
            deleteParticipant(event, studentEvent.eventID);
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

function generateSchoolEventsEntryDropdown(tableType, data, columnIndex) {
  let removeStudent = function (event) {
    let body = {
      studentID: data.studentID,
      eventID: data.eventID,
    };
    console.log("Fetch Delete Participant", body);

    let elementToDelete = document.getElementById("entry" + columnIndex);

    if (elementToDelete.parentElement.children.length == 1) {
      elementToDelete =
        elementToDelete.parentElement.parentElement.parentElement;
    }

    elementToDelete.parentElement.removeChild(elementToDelete);
  };

  return (
    <div className="tableEntryDropdown">
      <div className="tableEntryDropdownButtons">
        <TableEntryButton
          onClick={removeStudent}
          imageSrc="/images/delete.png"
          text="Remove"
        />
      </div>
    </div>
  );
}
