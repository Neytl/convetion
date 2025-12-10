import "convention/app/css/table.css";
import IconSpan from "../generalComponents/IconSpan";
import SimpleImage from "convention/components/generalComponents/SimpleImage";

export default function ParticipantIcon({ index, schoolName, fullName, age }) {
  return (
    <div className="participantIcon">
      <span className="listNumber">{index + "."}</span>
      <div className="iconSpan">
        <SimpleImage src={"/images/account.png"} width={20} height={20} />
        <span>
          <span>{fullName}</span>
          <span className="faded">{"(" + age + ")"}</span>
        </span>
      </div>
      <IconSpan imageSrc="/images/school.png" text={schoolName} />
    </div>
  );
}
