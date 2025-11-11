// import Image from "next/image";
import { createRoot } from "react-dom/client";
import TableEntry from "../TableEntry";

export default function AddSchoolPopup({ addSchoolDataEntry }) {
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
          />
        </div>
      </form>

      <span className="popupMessage"></span>

      <div className="popupButtonContainer">
        <div
          onClick={() => addNewSchool(addSchoolDataEntry)}
          className="submitPopupButton"
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

function clearError(event) {
  event.target.classList.remove("error");
}

function addNewSchool(addSchoolDataEntry) {
  let payload = {
    schoolName: document.getElementById("schoolName").value,
  };

  // Incomplete data
  if (!payload.schoolName) {
    document.getElementById("schoolName").classList.add("error");
    return;
  }

  // Make the request
  console.log("Fetch Add School", payload);
  fetch("https://localhost:44398/api/MiniConvention/school", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
    body: JSON.stringify(payload),
  })
    .then((response) => {
      if (!!response.status && response.status == 400) {
        console.log("Bad request");
        return null;
      }

      return response.json();
    })
    .then((data) => {
      if (!data) return;
      addSchoolDataEntry(data);
    });

  document.getElementById("popupContainer").classList.add("hidden");
}
