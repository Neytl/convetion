import { onPopupInput } from "./Popup";

export default function AddStudentPopup({ postNewData }) {
  const addNewStudent = () => {
    let payload = {
      firstNames: document.getElementById("firstName").value,
      lastNames: document.getElementById("lastName").value,
      birthdate: validateBirthdate(document.getElementById("birthdate").value),
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
    }

    if (errors) return;

    // Make the request
    postNewData("student", payload);
  };

  return (
    <div id="school_students_popup" className="hidden">
      <form className="popupFields">
        <div>
          <div className="popupInputLabel">
            <label htmlFor="firstName">Nombres:</label>
          </div>
          <input
            type="text"
            id="firstName"
            placeholder="Nombres"
            onInput={clearError}
            onKeyDown={onPopupInput}
            data-tab="A1"
          />
        </div>
        <div>
          <div className="popupInputLabel">
            <label htmlFor="lastName">Apellidos:</label>
          </div>
          <input
            type="text"
            id="lastName"
            placeholder="Apellidos"
            onInput={clearError}
            onKeyDown={onPopupInput}
            data-tab="A2"
          />
        </div>
        <div>
          <div className="popupInputLabel">
            <label htmlFor="birthdate">Fecha de nacimiento:</label>
          </div>
          <input
            type="text"
            id="birthdate"
            placeholder="dd/mm/aaaa"
            onInput={clearError}
            onKeyDown={onPopupInput}
            data-tab="A3"
          />
        </div>
      </form>

      <span className="popupMessage"></span>

      <div className="popupButtonContainer">
        <div
          onClick={addNewStudent}
          className="submitPopupButton"
          onKeyDown={onPopupInput}
          data-tab="A4"
          tabIndex={-1}
        >
          Registrar
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

// Returns true if valid, false if not
export const validateBirthdate = (birthdateString) => {
  // Split the string into day, month, and year parts
  if (!birthdateString) return false;
  const parts = birthdateString.split("/"); // [DD, MM, YYYY]
  if (parts.length != 3) return false;
  for (let i = 0; i < parts.length; i++) {
    let part = parts[i];
    if (!part) return false;
    if (isNaN(part)) return false;
  }

  const day = parseInt(parts[0]);
  const month = parseInt(parts[1]);
  const year = parseInt(parts[2]);

  // Generate and validate the date
  const date = new Date(month + "/" + day + "/" + year);
  if (!(date instanceof Date && !isNaN(date))) return false;

  // Validate the student's age
  if (date.getFullYear() <= 2012) {
    alert("Ha pasado el límite de edad.");
    // alert("Student is too old to participate.");
    return false;
  }

  if (date.getFullYear() >= 2021) {
    alert("Está por debajo del límite de edad.");
    // alert("Student is too young to participate.");
    return false;
  }

  return date.toLocaleDateString("en-US");
};
