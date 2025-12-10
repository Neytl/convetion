// import SimpleImage from "convention/components/generalComponents/SimpleImage";
import { useEffect, useState } from "react";
import TinyImage from "./TinyImage";
import {
  getLoggedInUserHeaders,
  getLoggedInUserToken,
  notAuthorized,
} from "../pageComponents/Content";

export default function EditSchoolEventPopup({
  schoolData,
  updateEventParticipants,
}) {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    if (!schoolData || students.length > 0) return;

    fetch(
      "https://mini-convention-beedavbxfwa0fdcj.mexicocentral-01.azurewebsites.net/api/MiniConvention/students/" +
        schoolData.schoolID,
      getLoggedInUserHeaders()
    )
      .then((response) => response.json())
      .then((data) => {
        if (notAuthorized(data)) return;
        setStudents(data);
        sessionStorage.setItem(
          "studentIDs",
          JSON.stringify(data.map((student) => student.studentID))
        );
      });
  }, [schoolData]);

  let popupElements = [];
  let currentAgeGroup;

  students.forEach((student) => {
    if (student.ageGroup != currentAgeGroup) {
      currentAgeGroup = student.ageGroup;
      popupElements.push(
        <div
          className={"ageGroupHeader " + currentAgeGroup}
          key={currentAgeGroup}
        >
          {currentAgeGroup}
        </div>
      );
    }

    popupElements.push(
      <div
        key={student.studentID}
        className="selectableParticipant"
        id={"participant" + student.studentID}
        onClick={() => {
          toggleParticipant(student);
        }}
      >
        <TinyImage imageSrc="account.png" />
        <div>{student.fullName}</div>
      </div>
    );
  });

  return (
    <div id="school_event_popup" className="hidden">
      <div id="teamEventContainer">
        <div id="teamOptionsContainer">
          <div id="teamOptionsElements">
            <div className="selected">Equipo 1</div>
          </div>
          <div key="addTeamButton" id="addTeamButton" onClick={addTeam}>
            <TinyImage imageSrc="add.png" />
            <span>Equipo</span>
          </div>
        </div>
        <div id="participantsAmountContainer">
          <span id="currentParticipantAmount">0</span>
          <span>{"/"}</span>
          <span id="currentMaxTeamSize">0</span>
          <span> Participantes</span>
        </div>
      </div>

      <form className="popupFields" id="participantsConatiner">
        {popupElements}
      </form>

      <div className="popupButtonContainer">
        <div
          onClick={() => {
            updateParticipants(schoolData.schoolID, updateEventParticipants);
          }}
          className="submitPopupButton"
        >
          Confirmar
        </div>
      </div>
    </div>
  );
}

function addTeam() {
  setUpEditSchoolEventPopupInternal(
    JSON.parse(
      sessionStorage.getItem(sessionStorage.getItem("currentEventID"))
    ),
    JSON.parse(sessionStorage.getItem("currentEvent")),
    null,
    true
  );
}

const setUpEditSchoolEventPopupInternal = (
  tableData,
  eventData,
  teamToEdit,
  addingTeam
) => {
  let eventID = eventData.eventID;

  // Uncheck all participants
  Array.from(document.querySelectorAll(".selectableParticipant")).forEach(
    (element) => {
      element.classList.remove("selected");
    }
  );

  document.getElementById("popupHeader").dataset.eventID = eventID;

  // Show team event data
  if (eventData.isTeamEvent) {
    document.getElementById("currentMaxTeamSize").innerHTML =
      eventData.maxTeamSize;
    document.getElementById("teamEventContainer").classList.remove("hidden");
  } else {
    document.getElementById("teamEventContainer").classList.add("hidden");
  }

  // Generate the new participants list
  if (eventData.isTeamEvent) {
    // Team event
    let currentEventParticipants = 0;
    if (!teamToEdit && !addingTeam) teamToEdit = 1;
    let numberOfTeamOptions = 1;

    tableData.forEach((participantData) => {
      if (participantData.teamNumber > numberOfTeamOptions)
        numberOfTeamOptions = participantData.teamNumber;

      if (participantData.teamNumber == teamToEdit) {
        // Show participant
        currentEventParticipants++;
        document
          .getElementById("participant" + participantData.studentID)
          .classList.add("selected");
      }
    });

    document.getElementById("currentParticipantAmount").innerHTML =
      currentEventParticipants;

    // Build the team option buttons
    let teamOptionsElements = document.getElementById("teamOptionsElements");
    teamOptionsElements.innerHTML = "";
    if (addingTeam) {
      numberOfTeamOptions++;
      teamToEdit = numberOfTeamOptions;
    }

    for (let i = 1; i <= numberOfTeamOptions; i++) {
      let child = document.createElement("div");
      child.innerHTML = "Equipo " + i;
      child.onclick = () => {
        setUpEditSchoolEventPopupInternal(
          JSON.parse(sessionStorage.getItem(eventID)),
          eventData,
          i
        );
      };
      if (i == teamToEdit) child.classList.add("selected");
      teamOptionsElements.appendChild(child);
    }
  } else {
    // Solo event
    tableData.forEach((participantData) => {
      participantData.team = "";
      participantData.teamNumber = 0;

      document
        .getElementById("participant" + participantData.studentID)
        .classList.add("selected");
    });
  }

  // Store the current table data
  sessionStorage.setItem(eventID, JSON.stringify(tableData));
  sessionStorage.setItem("currentEvent", JSON.stringify(eventData));
  sessionStorage.setItem("currentEventID", eventID);
  sessionStorage.setItem("currentTeam", teamToEdit);
};

export const setUpEditSchoolEventPopup = (
  tableData,
  eventData,
  teamToEdit,
  pageTables
) => {
  setUpEditSchoolEventPopupInternal(tableData, eventData, teamToEdit);

  // Check for maxed out students
  Array.from(document.querySelectorAll(".selectableParticipant")).forEach(
    (element) => {
      element.classList.remove("maxed");
    }
  );

  if (pageTables.length < MAX_EVENTS) return;
  let studentIDs = JSON.parse(sessionStorage.getItem("studentIDs"));
  let participantCounts = {};
  studentIDs.forEach((studentID) => {
    participantCounts[studentID] = 0;
  });

  pageTables.forEach((table) => {
    let inCurrentEvent = eventData.eventID == table.tableEventID;

    table.tableData.forEach((participant) => {
      if (inCurrentEvent) {
        // Participating in current event - no need to set as maxed out
        participantCounts[participant.studentID] = -1000000;
      } else {
        participantCounts[participant.studentID]++;
      }
    });
  });

  studentIDs.forEach((studentID) => {
    if (participantCounts[studentID] >= MAX_EVENTS) {
      document.getElementById("participant" + studentID).classList.add("maxed");
    }
  });
};

const MAX_EVENTS = 7;

function toggleParticipant(studentData) {
  let eventID = document.getElementById("popupHeader").dataset.eventID;
  let currentStudentList = JSON.parse(sessionStorage.getItem(eventID));
  if (!currentStudentList) currentStudentList = [];
  let teamNumber = parseInt(sessionStorage.getItem("currentTeam"));
  let participantElement = document.getElementById(
    "participant" + studentData.studentID
  );

  // Check for maxed out student
  if (participantElement.classList.contains("maxed")) {
    alert(
      "Este alumno ya está registrado para 7 eventos. No puede registrarse en más eventos."
    );
    // alert(
    //   "This student is already registered for 7 events. They cannot register for more events."
    // );

    return;
  }

  if (participantElement.classList.toggle("selected")) {
    // Add to list
    let currentEvent = JSON.parse(sessionStorage.getItem("currentEvent"));

    if (currentEvent.maxTeamSize > 1) {
      // Team event - validate addition
      // Look for already student already in another event
      if (
        currentStudentList.some(
          (participantData) =>
            participantData.studentID == studentData.studentID
        )
      ) {
        participantElement.classList.remove("selected");

        alert(
          "¡Este alumno ya está en otro equipo! Solo se puede participar en un equipo por evento."
        );
        // alert(
        //   "This student is already in another team! Students can only participate in one team per event."
        // );

        return;
      }

      // Check for going over the max
      let currentAmount = parseInt(
        document.getElementById("currentParticipantAmount").innerHTML
      );

      if (currentAmount + 1 > currentEvent.maxTeamSize) {
        participantElement.classList.remove("selected");

        alert(
          "No se puede seleccionar más de " +
            currentEvent.maxTeamSize +
            " participantes por equipo. Primero, deseleccione a otro alumno."
        );
        // alert(
        //   "Cannot select more than " +
        //     currentEvent.maxTeamSize +
        //     " participants per team. Unselect another student first."
        // );

        return;
      }
    }

    updateCurrentEventParticipantsAmount(+1);

    // Insert new participant into the correct team - keep sorted
    let found = false;
    let newParticipant = {
      eventID: eventID,
      studentID: studentData.studentID,
      teamNumber: teamNumber,
    };

    for (let i = 0; i < currentStudentList.length; i++) {
      if (currentStudentList[i].teamNumber >= teamNumber) {
        currentStudentList.splice(i, 0, newParticipant);
        found = true;
        break;
      }
    }

    if (!found) currentStudentList.push(newParticipant);
  } else {
    // Remove from list
    updateCurrentEventParticipantsAmount(-1);
    const indexToRemove = currentStudentList.findIndex(
      (participant) =>
        participant.studentID == studentData.studentID &&
        (!teamNumber || participant.teamNumber == teamNumber)
    );

    currentStudentList.splice(indexToRemove, 1);
  }

  sessionStorage.setItem(eventID, JSON.stringify(currentStudentList));
}

function updateParticipants(schoolID, updateEventParticipants) {
  // Generate the data
  let eventID = document.getElementById("popupHeader").dataset.eventID;
  let teamName = "";
  let currentStudentList = JSON.parse(
    sessionStorage.getItem(eventID + teamName)
  );

  let payload = {
    participants: currentStudentList,
  };

  // Make the requset
  console.log("Fetch update participants", currentStudentList);
  fetch(
    "https://mini-convention-beedavbxfwa0fdcj.mexicocentral-01.azurewebsites.net/api/MiniConvention/participants/" +
      schoolID +
      "/" +
      eventID,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: getLoggedInUserToken(),
      },
      body: JSON.stringify(payload),
    }
  )
    .then((response) => {
      if (!!response.status && response.status == 400) {
        console.log("Bad request");
        return null;
      }

      return response.json();
    })
    .then((data) => {
      if (!data) return;
      if (notAuthorized(data)) return;
      console.log(" = Response: ", data);
      updateEventParticipants(eventID, data);
    });

  document.getElementById("popupContainer").classList.add("hidden");
}

function updateCurrentEventParticipantsAmount(change) {
  let target = document.getElementById("currentParticipantAmount");
  let currentAmount = parseInt(target.innerHTML);
  target.innerHTML = currentAmount + change;
}
