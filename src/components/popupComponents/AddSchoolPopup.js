import { onPopupInput } from "./Popup";

export default function AddSchoolPopup({ postNewData }) {
  const addNewSchool = () => {
    let payload = {
      schoolName: document.getElementById("schoolName").value,
    };

    // Incomplete data
    if (!payload.schoolName) {
      document.getElementById("schoolName").classList.add("error");
      return;
    }

    // Make the request
    postNewData("school", payload);
  };

  const clearError = (event) => {
    event.target.classList.remove("error");
  };

  return (
    <div id="admin_schools_popup" className="hidden">
      <form className="popupFields">
        <div>
          <div className="popupInputLabel">
            <label htmlFor="schoolName">Name:</label>
          </div>
          <input
            type="text"
            id="schoolName"
            placeholder="School Name"
            onInput={clearError}
            onKeyDown={onPopupInput}
            data-tab="A1"
          />
        </div>
      </form>

      <span className="popupMessage"></span>

      <div className="popupButtonContainer">
        <div
          onClick={addNewSchool}
          className="submitPopupButton"
          onKeyDown={onPopupInput}
          data-tab="A2"
          tabIndex={-1}
        >
          Add
        </div>
      </div>
    </div>
  );
}

export const clearSchoolPopup = () => {
  document.getElementById("schoolName").value = "";
};
