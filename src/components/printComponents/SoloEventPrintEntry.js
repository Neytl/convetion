import "convention/app/css/print.css";
import Image from "next/image";

export default function SoloEventPrintEntry({ studentData }) {
  return (
    <div className="tableEntry">
      <div className="tableEntryData">
        <div className="primaryTableEntryData">
          <Image src={"/images/account.png"} alt="" width={30} height={30} />
          <span>{studentData.fullName}</span>
        </div>
        <div>
          <Image src={"/images/school.png"} alt="" width={30} height={30} />
          <div className="studentEvents">{studentData.schoolName}</div>
        </div>
      </div>
    </div>
  );
}
