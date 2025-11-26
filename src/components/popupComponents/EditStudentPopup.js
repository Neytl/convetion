import { validateBirthdate } from "./AddStudentPopup";
import { onPopupInput } from "./Popup";

export default function EditStudentPopup({ updateDataEntry }) {
  const updateStudent = () => {
    let payload = {
      studentID: document.getElementById("editFirstName").dataset.studentID,
      firstNames: document.getElementById("editFirstName").value,
      lastNames: document.getElementById("editLastName").value,
      birthdate: validateBirthdate(
        document.getElementById("editBirthdate").value
      ),
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
      document.getElementById("editBirthdate").classList.add("error");
      errors = true;
    }
    if (errors) return;

    // Make the request
    updateDataEntry("student", "studentID", payload);
  };

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
            onKeyDown={onPopupInput}
            data-tab="B1"
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
            onKeyDown={onPopupInput}
            data-tab="B2"
          />
        </div>
        <div>
          <div className="popupInputLabel">
            <label htmlFor="editBirthdate">Birthdate:</label>
          </div>
          <input
            type="text"
            id="editBirthdate"
            placeholder="dd/mm/aaaa"
            onInput={clearError}
            onKeyDown={onPopupInput}
            data-tab="B3"
          />
        </div>
      </form>

      <span className="popupMessage"></span>

      <div className="popupButtonContainer">
        <div
          onClick={updateStudent}
          className="submitPopupButton"
          onKeyDown={onPopupInput}
          data-tab="B4"
          tabIndex={-1}
        >
          Update
        </div>
      </div>
    </div>
  );
}

function clearError(event) {
  event.target.classList.remove("error");
}
