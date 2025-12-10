import "convention/app/css/print.css";
import SoloEventPrintEntry from "./SoloEventPrintEntry";
import SimpleImage from "convention/components/generalComponents/SimpleImage";

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
          className={"tableEntryHeader ageGroupTableHeader " + currentAgeGroup}
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
      <div className="eventPrintHeader">
        <SimpleImage src={"/images/event.png"} width={25} height={25} />
        {tableData.tableName}
      </div>
      <div className="soloEventPrintTable">
        <div className="tableHeader">
          <span>Nombre</span>
          <span>Escuela</span>
        </div>
        <div>{tableEntries}</div>
      </div>
    </div>
  );
}
