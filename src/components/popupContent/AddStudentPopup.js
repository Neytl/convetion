// import Image from "next/image";
import { Birthstone } from "next/font/google";
import TinyImage from "./TinyImage";

export default function AddStudentPopup({ postNewData }) {
  return (
    <div id="school_students_popup" className="hidden">
      <form className="popupFields">
        <div>
          <div className="popupInputLabel">
            <label htmlFor="firstName">First Name:</label>
          </div>
          <input
            type="text"
            id="firstName"
            placeholder="First Name"
            onInput={clearError}
          />
        </div>
        <div>
          <div className="popupInputLabel">
            <label htmlFor="lastName">Last Name:</label>
          </div>
          <input
            type="text"
            id="lastName"
            placeholder="Last Name"
            onInput={clearError}
          />
        </div>
        <div>
          <div className="popupInputLabel">
            <label htmlFor="birthdate">Birthdate:</label>
          </div>
          <input
            type="text"
            id="birthdate"
            placeholder="DD/MM/YYYY"
            onInput={clearError}
          />
        </div>
      </form>

      <span className="popupMessage"></span>

      <div className="popupButtonContainer">
        <div onClick={addNewStudent} className="submitPopupButton">
          Add
        </div>
      </div>
    </div>
  );
}

export const clearStudentPopup = () => {
  document.getElementById("firstName").value = "";
  document.getElementById("lastName").value = "";
  document.getElementById("birthdate").value = "";
};

function clearError(event) {
  event.target.classList.remove("error");
}

function addNewStudent() {
  let payload = {
    firstNames: document.getElementById("firstName").value,
    lastNames: document.getElementById("lastName").value,
    birthdate: document.getElementById("birthdate").value,
  };

  // Incomplete data
  let errors = false;
  if (!payload.firstNames) {
    document.getElementById("firstName").classList.add("error");
    errors = true;
  }
  if (!payload.lastNames) {
    document.getElementById("lastName").classList.add("error");
    errors = true;
  }
  if (!payload.birthdate) {
    document.getElementById("birthdate").classList.add("error");
    errors = true;
  } else {
    const date = new Date(payload.birthdate);
    if (!(date instanceof Date && !isNaN(date) && date.getFullYear() > 2000)) {
      document.getElementById("birthdate").classList.add("error");
      errors = true;
    }
  }

  if (errors) return;

  // Make the request
  console.log("Fetch Add Student", payload);
  fetch("https://localhost:44398/api/MiniConvention/student", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
    body: JSON.stringify(payload),
  })
    .then((response) => {
      if (!!response.status && response.status == 400) {
        console.log("Bad request");
        return null;
      }

      return response.json();
    })
    .then((data) => {
      if (!!data) console.log(" = Response: ", data);
    });
  document.getElementById("popupContainer").classList.add("hidden");
}
