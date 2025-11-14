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
              // TODO - open the popup
            }}
          >
            <Image src={"/images/event.png"} alt="" width={20} height={20} />
            <span>Add Event</span>
          </div>
        </div>
      );
  }
}
