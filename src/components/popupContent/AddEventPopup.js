// import Image from "next/image";
import TinyImage from "./TinyImage";

export default function AddEventPopup() {
  return (
    <div id="addEventPopup" className="hidden">
      <form className="popupFields">
        {/* Event Name */}
        <div>
          <div className="popupInputLabel">
            <TinyImage imageSrc="/images/event.png" />
            <label htmlFor="eventName">Name</label>
          </div>
          <input type="text" id="eventName" placeholder="Event Name" />
        </div>
        {/* Team Size */}
        <div id="teamSizeRow">
          <div id="eventHasTeamsButton">
            <div className="popupInputLabel">
              <TinyImage imageSrc="/images/event.png" />
              <label htmlFor="eventHasTeams">Teams?</label>
            </div>
            <input
              type="checkbox"
              className="popupCheckbox"
              id="eventHasTeams"
            />
          </div>
          <div id="teamSizeContainer">
            <div className="popupInputLabel">
              <TinyImage imageSrc="/images/event.png" />
              <label htmlFor="eventTeamSize">Team Size:</label>
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
            <TinyImage imageSrc="/images/event.png" />
            <label htmlFor="eventCategory">Category</label>
          </div>
          <select id="eventCategory" className="popupSelect">
            <option selected>Sports</option>
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
};
