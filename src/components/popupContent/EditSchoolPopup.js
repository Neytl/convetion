// import Image from "next/image";
import TinyImage from "./TinyImage";

export default function EditSchoolPopup() {
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
          />
        </div>
      </form>

      <span className="popupMessage"></span>

      <div className="popupButtonContainer">
        <div
          onClick={updateSchool}
          className="submitPopupButton"
          id="submitAdminSchool"
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

function updateSchool() {
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
  console.log("Fetch Update school", payload);
  fetch("https://localhost:44398/api/MiniConvention/school", {
    method: "PUT",
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
      if (!!data) console.log(" = Response: ", data);
    });

  document.getElementById("popupContainer").classList.add("hidden");
}
