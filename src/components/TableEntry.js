import Image from "next/image";
import IconSpan from "./IconSpan";
import TableEntryButton from "./TableEntryButton";
import "convention/app/css/table.css";

export default function TableEntry({ entryIconSrc, dataEntries, tableType }) {
  let columnIndex = 0;

  const onclickEntry = (event) => {
    event.target.closest(".tableEntry").classList.toggle("closed");
  };

  return (
    <div className="tableEntry closed">
      <div className="tableEntryData" onClick={onclickEntry}>
        <div className="primaryTableEntryData">
          <Image src={entryIconSrc} alt="" width={30} height={30} />
          <span>{dataEntries[0]}</span>
        </div>
        {dataEntries.slice(1).map((dataValue) => (
          <span key={columnIndex++}>{dataValue}</span>
        ))}
      </div>
      {lookupTableEntryDropdown(tableType)}
    </div>
  );
}

function lookupTableEntryDropdown(tableType) {
  switch (tableType) {
    case "admin_schools":
      return generateAdminSchoolEntryDropdown();
    case "admin_events":
      return generateAdminEventsEntryDropdown();
    case "school_events":
      return generateSchoolEventsEntryDropdown();
    case "school_students":
    default:
      return generateSchoolStudentsEntryDropdown();
  }
}

function generateAdminSchoolEntryDropdown() {
  return (
    <div className="tableEntryDropdown">
      <div className="schoolLoginInfo">
        <IconSpan imageSrc="/images/account.png" text="Username:" />
        <span>New School</span>
        <IconSpan imageSrc="/images/password.png" text="Password:" />
        <span>Password12345</span>
      </div>
      <div className="tableEntryDropdownButtons">
        <TableEntryButton imageSrc="/images/print.png" text="Print" />
        <TableEntryButton imageSrc="/images/edit.png" text="Edit" />
        <TableEntryButton imageSrc="/images/delete.png" text="Delete" />
        <TableEntryButton imageSrc="/images/account.png" text="Students" />
      </div>
    </div>
  );
}

function generateAdminEventsEntryDropdown() {
  return (
    <div className="tableEntryDropdown">
      <div className="eventParticipants">
        <IconSpan
          imageSrc="/images/account.png"
          text="Student 1 - New School"
        />
        <Image src="/images/delete.png" alt="" width="20" height="20" />
        <IconSpan
          imageSrc="/images/account.png"
          text="Student 2 - Harmony School"
        />
        <Image src="/images/delete.png" alt="" width="20" height="20" />
      </div>
      <div className="tableEntryDropdownButtons">
        <TableEntryButton imageSrc="/images/add.png" text="Participant" />
        <TableEntryButton imageSrc="/images/print.png" text="Print" />
        <TableEntryButton imageSrc="/images/edit.png" text="Edit" />
        <TableEntryButton imageSrc="/images/delete.png" text="Delete" />
      </div>
    </div>
  );
}

function generateSchoolEventsEntryDropdown() {
  return (
    <div className="tableEntryDropdown">
      <div className="tableEntryDropdownButtons">
        <TableEntryButton imageSrc="/images/delete.png" text="Remove" />
      </div>
    </div>
  );
}

function generateSchoolStudentsEntryDropdown() {
  return (
    <div className="tableEntryDropdown">
      <div className="eventParticipants">
        <IconSpan imageSrc="/images/event.png" text="Event 1" />
        <Image src="/images/delete.png" alt="" width="20" height="20" />
        <IconSpan imageSrc="/images/event.png" text="Event 2" />
        <Image src="/images/delete.png" alt="" width="20" height="20" />
        <IconSpan imageSrc="/images/event.png" text="Event 3" />
        <Image src="/images/delete.png" alt="" width="20" height="20" />
      </div>
      <div className="tableEntryDropdownButtons">
        <TableEntryButton imageSrc="/images/add.png" text="Event" />
        <TableEntryButton imageSrc="/images/edit.png" text="Student" />
        <TableEntryButton imageSrc="/images/delete.png" text="Delete" />
      </div>
    </div>
  );
}
