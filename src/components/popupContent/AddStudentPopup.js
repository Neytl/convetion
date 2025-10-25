// import Image from "next/image";
import { Birthstone } from "next/font/google";
import TinyImage from "./TinyImage";

export default function AddStudentPopup() {
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
  let body = {
    firstName: document.getElementById("firstName").value,
    lastName: document.getElementById("lastName").value,
    birthdate: document.getElementById("birthdate").value,
  };

  // Incomplete data
  let errors = false;
  if (!body.firstName) {
    document.getElementById("firstName").classList.add("error");
    errors = true;
  }
  if (!body.lastName) {
    document.getElementById("lastName").classList.add("error");
    errors = true;
  }
  if (!body.birthdate) {
    document.getElementById("birthdate").classList.add("error");
    errors = true;
  } else {
    const date = new Date(body.birthdate);
    if (!(date instanceof Date && !isNaN(date) && date.getFullYear() > 2000)) {
      document.getElementById("birthdate").classList.add("error");
      errors = true;
    }
  }

  if (errors) return;

  // Make the request
  console.log("Fetch Add Student", body);
  document.getElementById("popupContainer").classList.add("hidden");
}
