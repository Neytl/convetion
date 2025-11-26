import { onPopupInput } from "./Popup";

export default function EditSchoolPopup({ updateDataEntry }) {
  const updateSchool = () => {
    let input = document.getElementById("editSchoolName");

    let payload = {
      schoolID: input.dataset.schoolID,
      schoolName: input.value,
    };

    // Incomplete data
    if (!payload.schoolName) {
      document.getElementById("editSchoolName").classList.add("error");
      return;
    }

    // Make the request
    updateDataEntry("school", "schoolID", payload);
  };

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
            onKeyDown={onPopupInput}
            data-tab="B1"
          />
        </div>
      </form>

      <span className="popupMessage"></span>

      <div className="popupButtonContainer">
        <div
          onClick={updateSchool}
          className="submitPopupButton"
          id="submitAdminSchool"
          onKeyDown={onPopupInput}
          data-tab="B2"
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
