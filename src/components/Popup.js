"use client";
import "convention/app/css/popup.css";
import AddSchoolPopup from "./popupContent/AddSchoolPopup";

// export default function Popup({ title, contentElement }) {
export default function Popup() {
  const closePopup = (event) => {
    if (
      event.target.closest("#closePopupButton") == null &&
      event.target.closest("#popup") != null
    )
      return;
    document.getElementById("popupContainer").classList.add("hidden");
  };

  return (
    <div id="popupContainer" onClick={closePopup} className="hidden">
      <div id="popup">
        <div id="closePopupButton" onClick={closePopup}>
          <span>&times;</span>
        </div>
        <div id="popupTitle">Title</div>
        <div id="popupContent">
          <AddSchoolPopup />
        </div>
      </div>
    </div>
  );
}

export const openTableButtonPopup = (tableType) => {
  // Show the correct popup
  document
    .getElementById("popupContent")
    .childNodes.forEach((element) => element.classList.add("hidden"));

  switch (tableType) {
    case "admin_schools":
      document.getElementById("popupTitle").innerHTML = "Add School";
      document.getElementById("addSchoolPopup").classList.remove("hidden");
      break;
    case "admin_events":
      document.getElementById("popupTitle").innerHTML = "Add Event";
      document.getElementById("addSchoolPopup").classList.remove("hidden");
      break;
    case "school_events":
      document.getElementById("popupTitle").innerHTML = "Add Student";
      document.getElementById("addSchoolPopup").classList.remove("hidden");
      break;
    case "school_students":
    default:
      document.getElementById("popupTitle").innerHTML = "Add Student";
      document.getElementById("addSchoolPopup").classList.remove("hidden");
      break;
  }

  // Show the popup
  document.getElementById("popupContainer").classList.remove("hidden");
};
