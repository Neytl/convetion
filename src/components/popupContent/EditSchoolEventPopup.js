// import Image from "next/image";
import { useEffect, useState } from "react";
import TinyImage from "./TinyImage";

export default function EditSchoolEventPopup({ schoolData }) {
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
      popupElements.push(<div key={currentAgeGroup}>{currentAgeGroup}</div>);
    }

    popupElements.push(
      <div
        key={student.studentID}
        className="selectableParticipant"
        id={"participant" + student.studentID}
      >
        <TinyImage imageSrc="/images/account.png" />
        <div>{student.fullName}</div>
      </div>
    );
  });

  return (
    <div id="edit_school_event_popup" className="?hidden">
      <form className="popupFields">{popupElements}</form>

      <div className="popupButtonContainer">
        <div onClick={() => {}} className="submitPopupButton">
          Update
        </div>
      </div>
    </div>
  );
}

export const clearEventPopup = () => {
  document.getElementById("eventName").value = "";
  document.getElementById("eventTeamSize").value = 4;
  document.getElementById("eventHasTeams").checked = false;
  document.getElementById("teamSizeContainer").classList.add("hidden");
};

function clearError(event) {
  event.target.classList.remove("error");
}
