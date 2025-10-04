// import Image from "next/image";
import TinyImage from "./TinyImage";

export default function AddSchoolPopup() {
  return (
    <div id="addSchoolPopup" className="hidden">
      <form className="popupFields">
        <div>
          <div className="popupInputLabel">
            <label htmlFor="schoolName">Name:</label>
          </div>
          <input type="text" id="schoolName" placeholder="School Name" />
        </div>
      </form>

      <span className="popupMessage"></span>

      <div className="popupButtonContainer">
        <div className="submitPopupButton">Add</div>
      </div>
    </div>
  );
}

export const clearSchoolPopup = () => {
  document.getElementById("schoolName").value = "";
};
