// import Image from "next/image";
import TinyImage from "./TinyImage";

export default function AddEventPopup() {
  let onToggleCheckbox = function (event) {
    if (event.target.checked) {
      document.getElementById("teamSizeContainer").classList.remove("hidden");
    } else {
      document.getElementById("teamSizeContainer").classList.add("hidden");
    }
  };

  return (
    <div id="admin_events_popup" className="hidden">
      <form className="popupFields">
        {/* Event Name */}
        <div>
          <div className="popupInputLabel">
            <label htmlFor="eventName">Name:</label>
          </div>
          <input
            onInput={clearError}
            type="text"
            id="eventName"
            placeholder="Event Name"
          />
        </div>
        {/* Team Size */}
        <div id="teamSizeRow">
          <div id="eventHasTeamsButton">
            <div className="popupInputLabel">
              <label htmlFor="eventHasTeams">Teams?</label>
            </div>
            <label className="sliderContainer" htmlFor="eventHasTeams">
              <input
                onChange={onToggleCheckbox}
                type="checkbox"
                id="eventHasTeams"
              />
              <div className="slider"></div>
            </label>
          </div>
          <div id="teamSizeContainer">
            <div className="popupInputLabel">
              <label htmlFor="eventTeamSize">Size:</label>
            </div>
            <input
              type="number"
              id="eventTeamSize"
              defaultValue={4}
              min={2}
              max={30}
            />
          </div>
        </div>
        {/* Category */}
        <div>
          <div className="popupInputLabel">
            <label htmlFor="eventCategory">Category:</label>
          </div>
          <select
            id="eventCategory"
            defaultValue={"Deportes"}
            className="popupSelect"
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
        <div onClick={addNewEvent} className="submitPopupButton">
          Add
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

function addNewEvent() {
  let body = {
    eventName: document.getElementById("eventName").value,
    eventHasTeams: document.getElementById("eventHasTeams").checked,
    eventTeamSize: document.getElementById("eventTeamSize").value,
    eventCategory: document.getElementById("eventCategory").value,
  };

  // Incomplete data
  if (!body.eventName) {
    document.getElementById("eventName").classList.add("error");
    return;
  }

  // Make the request
  console.log("Fetch Add Event", body);
  document.getElementById("popupContainer").classList.add("hidden");
}
