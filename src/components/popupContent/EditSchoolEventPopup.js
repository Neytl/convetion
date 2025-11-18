// import Image from "next/image";
import { useEffect, useState } from "react";
import TinyImage from "./TinyImage";

export default function EditSchoolEventPopup({
  schoolData,
  updateEventParticipants,
}) {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    if (!schoolData) return;

    fetch(
      "https://localhost:44398/api/MiniConvention/students/" +
        schoolData.schoolID
    )
      .then((response) => response.json())
      .then((data) => {
        setStudents(data);
      });
  }, [schoolData]);

  let popupElements = [];
  let currentAgeGroup;

  students.forEach((student) => {
    if (student.ageGroup != currentAgeGroup) {
      currentAgeGroup = student.ageGroup;
      popupElements.push(
        <div className="ageGroupHeader" key={currentAgeGroup}>
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
        <TinyImage imageSrc="/images/account.png" />
        <div>{student.fullName}</div>
      </div>
    );
  });

  return (
    <div id="school_event_popup" className="hidden">
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
          Submit
        </div>
      </div>
    </div>
  );
}

export const setUpEditSchoolEventPopup = (
  tableData,
  eventID,
  tableObject,
  teamName
) => {
  // Uncheck all participants
  Array.from(document.querySelectorAll(".selectableParticipant")).forEach(
    (element) => {
      element.classList.remove("selected");
    }
  );

  document.getElementById("popupHeader").dataset.eventID = eventID;

  // Generate the new participants list
  sessionStorage.setItem(eventID, JSON.stringify(tableData));

  tableData.forEach((participantData) => {
    document
      .getElementById("participant" + participantData.studentID)
      .classList.add("selected");
  });

  // Store the current table data
  sessionStorage.setItem("currentEvent", JSON.stringify(tableObject));
};

function toggleParticipant(studentData) {
  let eventID = document.getElementById("popupHeader").dataset.eventID;
  let teamName = "";
  let currentStudentList = JSON.parse(
    sessionStorage.getItem(eventID + teamName)
  );

  if (!currentStudentList) currentStudentList = [];

  if (
    document
      .getElementById("participant" + studentData.studentID)
      .classList.toggle("selected")
  ) {
    // Add to list
    currentStudentList.push({
      eventID: eventID,
      studentID: studentData.studentID,
    });
  } else {
    // Remove from list
    const indexToRemove = currentStudentList.findIndex(
      (participant) => participant.studentID == studentData.studentID
    );
    currentStudentList.splice(indexToRemove, 1);
  }

  sessionStorage.setItem(
    eventID + teamName,
    JSON.stringify(currentStudentList)
  );
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
    "https://localhost:44398/api/MiniConvention/participants/" +
      schoolID +
      "/" +
      eventID,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
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
      console.log(" = Response: ", data);
      updateEventParticipants(eventID, data);
    });

  document.getElementById("popupContainer").classList.add("hidden");
}
