import Image from "next/image";
import IconSpan from "./IconSpan";
import TableEntryButton from "./TableEntryButton";
import "convention/app/css/table.css";
import { openTableButtonPopup } from "./Popup";

export default function TableEntry({ entryIconSrc, dataEntries, tableType }) {
  let columnIndex = 0;

  const onclickEntry = (event) => {
    event.target.closest(".tableEntry").classList.toggle("closed");
  };

  return (
    <div className="tableEntry closed" id={"entry" + dataEntries[0]}>
      <div className="tableEntryData" onClick={onclickEntry}>
        <div className="primaryTableEntryData">
          <Image src={entryIconSrc} alt="" width={30} height={30} />
          <span>{dataEntries[0]}</span>
        </div>
        {dataEntries.slice(1).map((dataValue) => (
          <span key={columnIndex++}>{dataValue}</span>
        ))}
      </div>
      {lookupTableEntryDropdown(tableType, dataEntries)}
    </div>
  );
}

function lookupTableEntryDropdown(tableType, data) {
  switch (tableType) {
    case "admin_schools":
      return generateAdminSchoolEntryDropdown(tableType, data);
    case "admin_events":
      return generateAdminEventsEntryDropdown(tableType, data);
    case "school_events":
      return generateSchoolEventsEntryDropdown(tableType, data);
    case "school_students":
    default:
      return generateSchoolStudentsEntryDropdown(tableType, data);
  }
}

function generateAdminSchoolEntryDropdown(tableType, data) {
  let printSchoolData = function () {
    // TODO
    console.log("Printing out '" + data[0] + "' school data...");
  };

  let editSchoolData = function () {
    openTableButtonPopup("edit_" + tableType + "_popup");
    let input = document.getElementById("editSchoolName");
    input.value = data[0];
    input.dataset.schooID = data[0];
  };

  let deleteSchool = function (event) {
    if (confirm("Are you sure you want to delete '" + data[0] + "'?")) {
      let body = {
        schooID: data[0],
      };
      console.log("Fetch Delete School", body);

      let elementToDelete = document.getElementById("entry" + data[0]);
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
        <span>New School</span>
        <IconSpan imageSrc="/images/password.png" text="Password:" />
        <span>Password12345</span>
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

function generateAdminEventsEntryDropdown(tableType, data) {
  let printEvent = function () {
    // TODO
    console.log("Printing out '" + data[0] + "' event data...");
  };

  let editEvent = function () {
    openTableButtonPopup("edit_" + tableType + "_popup");

    let input = document.getElementById("editEventName");
    input.value = data[0];
    input.dataset.eventID = data[0];

    if (data[2] != "-") {
      // Teams
      document.getElementById("editEventHasTeams").checked = true;
      document
        .getElementById("editTeamSizeContainer")
        .classList.remove("hidden");
      document.getElementById("editEventTeamSize").value = parseInt(data[2]);
    } else {
      document.getElementById("editEventHasTeams").checked = false;
      document.getElementById("editTeamSizeContainer").classList.add("hidden");
    }

    // TODO - set the event category
    // ...
  };

  let deleteEvent = function (event) {
    if (confirm("Are you sure you want to delete '" + data[0] + "'?")) {
      let body = {
        eventID: data[0],
      };
      console.log("Fetch Delete Event", body);

      let elementToDelete = document.getElementById("entry" + data[0]);
      elementToDelete.parentElement.removeChild(elementToDelete);
    }
  };

  return (
    <div className="tableEntryDropdown">
      <div className="eventParticipants">
        <IconSpan
          imageSrc="/images/account.png"
          text="Student 1 - New School"
        />
        <Image src="/images/delete.png" alt="" width="20" height="20" />
        <IconSpan
          imageSrc="/images/account.png"
          text="Student 2 - Harmony School"
        />
        <Image src="/images/delete.png" alt="" width="20" height="20" />
      </div>
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

function generateSchoolStudentsEntryDropdown(tableType, data) {
  let editStudent = function () {
    openTableButtonPopup("edit_" + tableType + "_popup");
    console.log(data);

    let input = document.getElementById("editEventName");
    input.value = data[0];
    input.dataset.eventID = data[0];

    if (data[2] != "-") {
      // Teams
      document.getElementById("editEventHasTeams").checked = true;
      document
        .getElementById("editTeamSizeContainer")
        .classList.remove("hidden");
      document.getElementById("editEventTeamSize").value = parseInt(data[2]);
    } else {
      document.getElementById("editEventHasTeams").checked = false;
      document.getElementById("editTeamSizeContainer").classList.add("hidden");
    }

    // TODO - set the event category
    // ...
  };

  let deleteStudent = function (event) {
    if (confirm("Are you sure you want to delete '" + data[0] + "'?")) {
      let body = {
        studentID: data[0],
      };
      console.log("Fetch Delete Student", body);

      let elementToDelete = document.getElementById("entry" + data[0]);
      elementToDelete.parentElement.removeChild(elementToDelete);
    }
  };

  return (
    <div className="tableEntryDropdown">
      <div className="eventParticipants">
        <IconSpan imageSrc="/images/event.png" text="Event 1" />
        <Image src="/images/delete.png" alt="" width="20" height="20" />
        <IconSpan imageSrc="/images/event.png" text="Event 2" />
        <Image src="/images/delete.png" alt="" width="20" height="20" />
        <IconSpan imageSrc="/images/event.png" text="Event 3" />
        <Image src="/images/delete.png" alt="" width="20" height="20" />
      </div>
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

function generateSchoolEventsEntryDropdown(tableType, data) {
  return (
    <div className="tableEntryDropdown">
      <div className="tableEntryDropdownButtons">
        <TableEntryButton imageSrc="/images/delete.png" text="Remove" />
      </div>
    </div>
  );
}
