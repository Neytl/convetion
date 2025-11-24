import "convention/app/css/print.css";
import SoloEventPrintEntry from "./SoloEventPrintEntry";
import Image from "next/image";
import IconSpan from "../generalComponents/IconSpan";

export default function TeamEventPrintTable({ tableData }) {
  // Build the table entries
  let tableEntries = [];
  let currentTeamEntries = [];
  let mixedAgeTeamEntries = [];
  let currentTeamNumber = "";
  let currentSchool = "";
  let currentAgeGroup = "";
  let currentTeamAgeGroup = "";
  let isMixedAgeGroup = false;

  tableData.tableData.forEach((studentData) => {
    currentSchool = studentData.schoolName;

    if (studentData.ageGroup != currentAgeGroup) {
      if (!!currentAgeGroup) {
        isMixedAgeGroup = true;
      }

      currentAgeGroup = studentData.ageGroup;
    }

    // Add the current team
    if (studentData.teamNumber != currentTeamNumber) {
      if (!!currentTeamNumber) {
        if (isMixedAgeGroup) {
          mixedAgeTeamEntries.push(
            buildTeamElement(
              currentSchool,
              currentTeamNumber,
              currentTeamEntries,
              true
            )
          );
        } else {
          tableEntries.push(
            buildTeamElement(
              currentSchool,
              currentTeamNumber,
              currentTeamEntries
            )
          );
        }
      }

      // Look for a new age group
      if (!isMixedAgeGroup && currentAgeGroup != currentTeamAgeGroup) {
        currentTeamAgeGroup = currentAgeGroup;

        tableEntries.push(
          <div
            key={currentTeamAgeGroup}
            className={"tableEntryHeader " + currentTeamAgeGroup}
          >
            {currentTeamAgeGroup}
          </div>
        );
      }

      // Reset variable for the next team
      currentTeamEntries = [];
      currentTeamNumber = studentData.teamNumber;
      currentAgeGroup = "";
      isMixedAgeGroup = false;
    }

    // Build the participant entry element
    currentTeamEntries.push(
      <div key={studentData.studentID} className="teamEventParticipant">
        <Image src={"/images/account.png"} alt="" width={30} height={30} />
        <div>{studentData.fullName}</div>
        <div className="studentAge">
          {"(" + studentData.age + "-" + studentData.ageGroup + ")"}
        </div>
      </div>
    );
  });

  if (isMixedAgeGroup) {
    mixedAgeTeamEntries.push(
      buildTeamElement(
        currentSchool,
        currentTeamNumber,
        currentTeamEntries,
        true
      )
    );
  } else {
    tableEntries.push(
      buildTeamElement(currentSchool, currentTeamNumber, currentTeamEntries)
    );
  }

  // Add the mixed age group teams
  if (mixedAgeTeamEntries.length > 0) {
    tableEntries.push(
      <div key={"Mixto"} className={"tableEntryHeader Mixto"}>
        Edades Mixto
      </div>
    );

    tableEntries.push(...mixedAgeTeamEntries);
  }

  // Bulid the table
  return (
    <div className="printTableContainer">
      <div className="eventPrintHeader">{tableData.tableName}</div>
      <div className="teamEventPrintTable">
        <div className="tableHeader">
          <span>School</span>
          <span>Name</span>
        </div>
        <div>{tableEntries}</div>
      </div>
    </div>
  );
}

function buildTeamElement(
  currentSchool,
  currentTeamNumber,
  currentTeamEntries,
  isMixedAgeGroup
) {
  return (
    <div
      key={currentSchool + currentTeamNumber}
      className={
        isMixedAgeGroup ? "eventTeamEntry mixedAges" : "eventTeamEntry"
      }
    >
      <div className="eventTeamHeader">
        <IconSpan imageSrc={"/images/school.png"} text={currentSchool} />
        <div>{"-"}</div>
        <div>{"Team " + currentTeamNumber}</div>
      </div>
      <div className="eventTeamParticipants">{currentTeamEntries}</div>
    </div>
  );
}
