import "convention/app/css/print.css";
import StudentPrintEntry from "./StudentPrintEntry";
import SoloEventPrintEntry from "./SoloEventPrintEntry";

export default function SoloEventPrintTable({ tableData }) {
  // Build the table entries
  let tableEntries = [];
  let currentAgeGroup = "";

  tableData.tableData.forEach((studentData) => {
    if (studentData.ageGroup != currentAgeGroup) {
      currentAgeGroup = studentData.ageGroup;
      tableEntries.push(
        <div
          key={currentAgeGroup}
          className={"tableEntryHeader " + currentAgeGroup}
        >
          {currentAgeGroup}
        </div>
      );
    }

    tableEntries.push(
      <SoloEventPrintEntry
        studentData={studentData}
        key={studentData.studentID}
      />
    );
  });

  // Bulid the table
  return (
    <div className="printTableContainer">
      <div className="eventPrintHeader">{tableData.tableName}</div>
      <div className="soloEventPrintTable">
        <div className="tableHeader">
          <span>Name</span>
          <span>School</span>
        </div>
        <div>{tableEntries}</div>
      </div>
    </div>
  );
}
