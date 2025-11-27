import Image from "next/image";
import "convention/app/css/table.css";
import { clearStudentPopup } from "../popupComponents/AddStudentPopup";

export default function PageButton({ pathName, pageData }) {
  switch (pathName) {
    case "/":
      return (
        <div id="pageButtonContainer">
          <div
            id="pageButton"
            className="pageButton"
            onClick={() => {
              window.open("printSchools", "_blank");
            }}
          >
            <Image src={"/images/print.png"} alt="" width={20} height={20} />
            <span>Registration</span>
          </div>
        </div>
      );
    case "/adminEvents":
      return (
        <div id="pageButtonContainer">
          <div
            id="pageButton"
            className="pageButton"
            onClick={() => {
              window.open("printEvents", "_blank");
            }}
          >
            <Image src={"/images/print.png"} alt="" width={20} height={20} />
            <span>Events</span>
          </div>
        </div>
      );
    case "/schoolStudents":
      return (
        <div id="pageButtonContainer">
          <div
            id="pageButton"
            className="pageButton"
            onClick={() => {
              // Close the current popup
              document
                .getElementById("popupContent")
                .childNodes.forEach((element) =>
                  element.classList.add("hidden")
                );

              // Set up the new popup
              document.getElementById("popupTitle").innerHTML = "Add Student";
              document.getElementById("popupHeaderIcon").srcset =
                "/images/account.png";
              clearStudentPopup();

              // Show the new popup
              document
                .getElementById("school_students_popup")
                .classList.remove("hidden");
              document
                .getElementById("popupContainer")
                .classList.remove("hidden");
            }}
          >
            <Image src={"/images/account.png"} alt="" width={20} height={20} />
            <span>Add Student</span>
          </div>
        </div>
      );
    case "/schoolEvents":
      return (
        <div id="pageButtonContainer">
          <div
            id="pageButton"
            className="pageButton"
            onClick={() => {
              // Close the current popup
              document
                .getElementById("popupContent")
                .childNodes.forEach((element) =>
                  element.classList.add("hidden")
                );

              // Set up the new popup
              document.getElementById("popupTitle").innerHTML = "Edit Events";
              document.getElementById("popupHeaderIcon").srcset =
                "/images/event.png";

              // Show the new popup
              document
                .getElementById("add_school_event_popup")
                .classList.remove("hidden");
              document
                .getElementById("popupContainer")
                .classList.remove("hidden");
              document.getElementById("eventsListConatiner").scrollTop = 0;
            }}
          >
            <Image src={"/images/event.png"} alt="" width={20} height={20} />
            <span>Edit Events</span>
          </div>
        </div>
      );
  }
}
