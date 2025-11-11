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
  let payload = {
    studentID: document.getElementById("editFirstName").dataset.studentID,
    firstNames: document.getElementById("editFirstName").value,
    lastNames: document.getElementById("editLastName").value,
    birthdate: document.getElementById("editBirthdate").value,
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
  if (!!payload.birthdate) {
    const date = new Date(payload.birthdate);
    if (!(date instanceof Date && !isNaN(date) && date.getFullYear() > 2000)) {
      document.getElementById("editBirthdate").classList.add("error");
      errors = true;
    }
  } else {
    document.getElementById("editBirthdate").classList.add("error");
    errors = true;
  }
  if (errors) return;

  // Make the request
  console.log("Fetch Update Student", payload);
  fetch("https://localhost:44398/api/MiniConvention/student", {
    method: "PUT",
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
