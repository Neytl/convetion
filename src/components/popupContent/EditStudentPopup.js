// import Image from "next/image";
import { Birthstone } from "next/font/google";
import TinyImage from "./TinyImage";

export default function EditStudentPopup() {
  return (
    <div id="edit_school_students_popup" className="hidden">
      <form className="popupFields">
        <div>
          <div className="popupInputLabel">
            <label htmlFor="editFirstName">First Name:</label>
          </div>
          <input
            type="text"
            id="editFirstName"
            placeholder="First Name"
            onInput={clearError}
          />
        </div>
        <div>
          <div className="popupInputLabel">
            <label htmlFor="editLastName">Last Name:</label>
          </div>
          <input
            type="text"
            id="editLastName"
            placeholder="Last Name"
            onInput={clearError}
          />
        </div>
        <div>
          <div className="popupInputLabel">
            <label htmlFor="editBirthdate">Birthdate:</label>
          </div>
          <input
            type="text"
            id="editBirthdate"
            placeholder="DD/MM/YYYY"
            onInput={clearError}
          />
        </div>
      </form>

      <span className="popupMessage"></span>

      <div className="popupButtonContainer">
        <div onClick={updateStudent} className="submitPopupButton">
          Update
        </div>
      </div>
    </div>
  );
}

function clearError(event) {
  event.target.classList.remove("error");
}

function updateStudent() {
  let body = {
    studentID: document.getElementById("editFirstName").dataset.studentID,
    firstName: document.getElementById("editFirstName").value,
    lastName: document.getElementById("editLastName").value,
    birthdate: document.getElementById("editBirthdate").value,
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
  if (!!body.birthdate) {
    const date = new Date(body.birthdate);
    if (!(date instanceof Date && !isNaN(date) && date.getFullYear() > 2000)) {
      document.getElementById("birthdate").classList.add("error");
      errors = true;
    }
  }
  if (errors) return;

  // Make the request
  console.log("Fetch Update Student", body);
  document.getElementById("popupContainer").classList.add("hidden");
}
