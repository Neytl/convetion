import "convention/app/css/print.css";
import SimpleImage from "convention/components/generalComponents/SimpleImage";

export default function SoloEventPrintEntry({ studentData }) {
  return (
    <div className="tableEntry">
      <div className="tableEntryData">
        <div className="primaryTableEntryData">
          <SimpleImage src={"/images/account.png"} width={30} height={30} />
          <span>{studentData.fullName}</span>
        </div>
        <div>
          <SimpleImage src={"/images/school.png"} width={30} height={30} />
          <div className="studentEvents">{studentData.schoolName}</div>
        </div>
      </div>
    </div>
  );
}
