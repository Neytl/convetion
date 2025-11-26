import { onPopupInput } from "./Popup";

export default function EditAdminEventPopup({ updateDataEntry }) {
  let onToggleCheckbox = function (event) {
    if (event.target.checked) {
      document
        .getElementById("editTeamSizeContainer")
        .classList.remove("hidden");
    } else {
      document.getElementById("editTeamSizeContainer").classList.add("hidden");
    }
  };

  const updateEvent = () => {
    let payload = {
      eventID: document.getElementById("editEventName").dataset.eventID,
      eventName: document.getElementById("editEventName").value,
      isTeamEvent: document.getElementById("editEventHasTeams").checked,
      maxTeamSize: document.getElementById("editEventTeamSize").value,
      category: document.getElementById("editEventCategory").value,
    };

    // Incomplete data
    if (!payload.eventName) {
      document.getElementById("editEventName").classList.add("error");
      return;
    }

    // Make the request
    updateDataEntry("event", "eventID", payload);
  };

  return (
    <div id="edit_admin_events_popup" className="hidden">
      <form className="popupFields">
        {/* Event Name */}
        <div>
          <div className="popupInputLabel">
            <label htmlFor="editEventName">Name:</label>
          </div>
          <input
            onInput={clearError}
            type="text"
            id="editEventName"
            placeholder="Event Name"
            onKeyDown={onPopupInput}
            data-tab="B1"
          />
        </div>
        {/* Team Size */}
        <div id="teamSizeRow">
          <div id="editEventHasTeamsButton">
            <div className="popupInputLabel">
              <label htmlFor="eventHasTeams">Teams?</label>
            </div>
            <label className="sliderContainer" htmlFor="editEventHasTeams">
              <input
                onChange={onToggleCheckbox}
                type="checkbox"
                id="editEventHasTeams"
              />
              <div
                className="slider"
                onKeyDown={onPopupInput}
                data-tab="B2"
                tabIndex={-1}
              ></div>
            </label>
          </div>
          <div id="editTeamSizeContainer">
            <div className="popupInputLabel">
              <label htmlFor="eventTeamSize">Size:</label>
            </div>
            <input
              type="number"
              id="editEventTeamSize"
              defaultValue={4}
              min={2}
              max={30}
              onKeyDown={onPopupInput}
              data-tab="B3"
            />
          </div>
        </div>
        {/* Category */}
        <div>
          <div className="popupInputLabel">
            <label htmlFor="editEventCategory">Category:</label>
          </div>
          <select
            id="editEventCategory"
            defaultValue={"Deportes"}
            className="popupSelect"
            onKeyDown={onPopupInput}
            data-tab="B4"
          >
            <option>Deportes</option>
            <option>Música</option>
            <option>Exhibiciones</option>
            <option>Concursos Académicos</option>
          </select>
        </div>
      </form>

      <span className="popupMessage"></span>

      <div className="popupButtonContainer">
        <div
          onClick={updateEvent}
          className="submitPopupButton"
          onKeyDown={onPopupInput}
          data-tab="B5"
          tabIndex={-1}
        >
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
