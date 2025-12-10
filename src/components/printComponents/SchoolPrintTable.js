import "convention/app/css/print.css";
import "convention/app/css/table.css";
import StudentPrintEntry from "./StudentPrintEntry";
import Stats from "../pageComponents/Stats";
import SimpleImage from "convention/components/generalComponents/SimpleImage";

export default function SchoolPrintTable({ tableData }) {
  // Empty table
  if (tableData.tableData.length == 0) {
    return;
  }

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
      <StudentPrintEntry
        studentData={studentData}
        key={studentData.studentID}
      />
    );
  });

  // Bulid the table
  return (
    <div className="printTableContainer">
      <div className="schoolHeader">
        <SimpleImage src={"/images/school.png"} width={35} height={35} />
        {tableData.tableName}
      </div>
      <Stats statsData={tableData.printStats} />
      <div className="schoolPrintTable">
        <div className="tableHeader">
          <span>Nombre</span>
          <span>Edad</span>
          <span>Eventos</span>
        </div>
        <div>{tableEntries}</div>
      </div>
    </div>
  );
}
