import "convention/app/css/print.css";
import SimpleImage from "convention/components/generalComponents/SimpleImage";

export default function StudentPrintEntry({ studentData }) {
  let events = <span>None</span>;

  if (studentData.events.length > 0) {
    let eventsList = studentData.events
      .map((events) => events.eventName)
      .join(", ");

    events = <span>{eventsList}</span>;
  }

  return (
    <div className="tableEntry">
      <div className="tableEntryData">
        <div className="primaryTableEntryData">
          <SimpleImage src={"/images/account.png"} width={30} height={30} />
          <span>{studentData.fullName}</span>
        </div>
        <span>{studentData.age}</span>
        <div>
          <SimpleImage src={"/images/event.png"} width={30} height={30} />
          <div className="studentEvents">{events}</div>
        </div>
      </div>
    </div>
  );
}
