import { onPopupInput } from "./Popup";

export default function AddEventPopup({ postNewData }) {
  const onToggleCheckbox = (event) => {
    if (event.target.checked) {
      document.getElementById("teamSizeContainer").classList.remove("hidden");
    } else {
      document.getElementById("teamSizeContainer").classList.add("hidden");
    }
  };

  const addNewEvent = () => {
    let payload = {
      eventName: document.getElementById("eventName").value,
      isTeamEvent: document.getElementById("eventHasTeams").checked,
      maxTeamSize: document.getElementById("eventTeamSize").value,
      category: document.getElementById("eventCategory").value,
    };

    // Incomplete data
    if (!payload.eventName) {
      document.getElementById("eventName").classList.add("error");
      return;
    }

    // Make the request
    postNewData("event", payload);
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
            onKeyDown={onPopupInput}
            data-tab="A1"
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
              <div
                className="slider"
                onKeyDown={onPopupInput}
                data-tab="A2"
                tabIndex={-1}
              ></div>
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
              onKeyDown={onPopupInput}
              data-tab="A3"
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
            onKeyDown={onPopupInput}
            data-tab="A4"
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
          onClick={addNewEvent}
          className="submitPopupButton"
          onKeyDown={onPopupInput}
          data-tab="A5"
          tabIndex={-1}
        >
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
