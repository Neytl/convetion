// import Image from "next/image";
import TinyImage from "./TinyImage";

export default function EditSchoolPopup() {
  return (
    <div id="edit_admin_schools_popup" className="hidden">
      <form className="popupFields">
        <div>
          <div className="popupInputLabel">
            <label htmlFor="schoolName">Name:</label>
          </div>
          <input
            type="text"
            id="editSchoolName"
            placeholder="School Name"
            onInput={clearError}
          />
        </div>
      </form>

      <span className="popupMessage"></span>

      <div className="popupButtonContainer">
        <div
          onClick={updateSchool}
          className="submitPopupButton"
          id="submitAdminSchool"
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

function updateSchool() {
  let input = document.getElementById("editSchoolName");

  let body = {
    schoolID: input.dataset.schoolID,
    schoolName: input.value,
  };

  // Incomplete data
  if (!body.schoolName) {
    document.getElementById("editSchoolName").classList.add("error");
    return;
  }

  // Make the request
  console.log("Fetch Update school", body);
  document.getElementById("popupContainer").classList.add("hidden");
}
