import Image from "next/image";
import "convention/app/css/table.css";

export default function PageButton({ pathName, pageData }) {
  switch (pathName) {
    case "/":
      return (
        <div id="pageButtonContainer">
          <div
            id="pageButton"
            className="pageButton"
            onClick={() => {
              window.location.href = "printSchools";
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
              window.location.href = "printEvents";
            }}
          >
            <Image src={"/images/print.png"} alt="" width={20} height={20} />
            <span>Events</span>
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
              document.getElementById("popupTitle").innerHTML = "Add Event";
              document.getElementById("popupHeaderIcon").srcset =
                "/images/Event.png";

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
            <span>Add Event</span>
          </div>
        </div>
      );
  }
}
