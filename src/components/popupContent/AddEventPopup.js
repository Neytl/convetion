// import Image from "next/image";
import TinyImage from "./TinyImage";

export default function AddEventPopup() {
  return (
    <div id="addEventPopup" className="hidden">
      <form className="popupFields">
        {/* Event Name */}
        <div>
          <div className="popupInputLabel">
            <label htmlFor="eventName">Name:</label>
          </div>
          <input type="text" id="eventName" placeholder="Event Name" />
        </div>
        {/* Team Size */}
        <div id="teamSizeRow">
          <div id="eventHasTeamsButton">
            <div className="popupInputLabel">
              <label htmlFor="eventHasTeams">Teams?</label>
            </div>
            <label className="sliderContainer" htmlFor="eventHasTeams">
              <input type="checkbox" id="eventHasTeams" />
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
            defaultValue={"Sports"}
            className="popupSelect"
          >
            <option>Sports</option>
          </select>
        </div>
      </form>

      <span className="popupMessage"></span>

      <div className="popupButtonContainer">
        <div className="submitPopupButton">Add</div>
      </div>
    </div>
  );
}

export const clearEventPopup = () => {
  document.getElementById("eventName").value = "";
  document.getElementById("eventTeamSize").value = 4;
  document.getElementById("eventHasTeams").checked = false;
};
