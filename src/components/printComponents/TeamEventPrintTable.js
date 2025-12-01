import "convention/app/css/print.css";
import Image from "next/image";
import IconSpan from "../generalComponents/IconSpan";

export default function TeamEventPrintTable({ tableData }) {
  // Assign a team ID to each team
  let participants = structuredClone(tableData).tableData;
  participants.forEach((studentData) => {
    studentData.teamID = studentData.schoolName + studentData.teamNumber;
  });

  // Sort teams by Team ID
  participants.sort((a, b) => a.teamID.localeCompare(b.teamID));

  // Build team data
  let teamData = [];
  let currentParticipants = [];
  let currentTeamID = "";

  participants.forEach((studentData) => {
    if (!currentTeamID) currentTeamID = studentData.teamID;

    // Finished team
    if (studentData.teamID != currentTeamID) {
      teamData.push({
        teamMembers: currentParticipants,
      });

      currentTeamID = studentData.teamID;
      currentParticipants = [];
    }

    currentParticipants.push(studentData);
  });
  teamData.push({
    teamMembers: currentParticipants,
  });

  // Add age/school information to teams
  teamData.forEach((team) => {
    team.schoolName = team.teamMembers[0].schoolName;
    team.teamNumber = team.teamMembers[0].teamNumber;
    team.ageGroup = team.teamMembers[0].ageGroup;
    team.isMixedAgeGroup = team.teamMembers.some(
      (teamMember) => teamMember.ageGroup != team.ageGroup
    );

    if (team.isMixedAgeGroup) {
      team.sortPriority = 100;
      team.ageGroup = "Edades Mixtas";
    } else {
      team.sortPriority = team.teamMembers[0].age;
    }
  });

  // Sort teams by age group
  teamData.sort((a, b) => a.sortPriority - b.sortPriority);

  // Build the table entries
  let tableEntries = [];
  let currentAgeGroup = "";

  teamData.forEach((team) => {
    let currentTeamEntries = [];

    // Look for a new age group header
    if (team.ageGroup != currentAgeGroup) {
      currentAgeGroup = team.ageGroup;
      tableEntries.push(
        <div
          key={currentAgeGroup}
          className={"tableEntryHeader " + currentAgeGroup}
        >
          {currentAgeGroup}
        </div>
      );
    }

    // Build the participant elements
    team.teamMembers.forEach((teamMember) => {
      currentTeamEntries.push(
        <div key={teamMember.studentID} className="teamEventParticipant">
          <Image src={"/images/account.png"} alt="" width={30} height={30} />
          <div>{teamMember.fullName}</div>
          <div className="studentAge">{"(" + teamMember.age + ")"}</div>
        </div>
      );
    });

    // Build the team element
    tableEntries.push(
      buildTeamElement(
        team.schoolName,
        team.teamNumber,
        currentTeamEntries,
        team.isMixedAgeGroup
      )
    );
  });

  // Bulid the table
  return (
    <div className="printTableContainer">
      <div className="eventPrintHeader">{tableData.tableName}</div>
      <div className="teamEventPrintTable">
        <div className="tableHeader">
          <span>Escuela</span>
          <span>Nombre</span>
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
      key={currentSchool + "-" + currentTeamNumber}
      className={
        !!isMixedAgeGroup ? "eventTeamEntry mixedAges" : "eventTeamEntry"
      }
    >
      <div className="eventTeamHeader">
        <IconSpan imageSrc={"/images/school.png"} text={currentSchool} />
        <div>{"-"}</div>
        <div>{"Equipo " + currentTeamNumber}</div>
      </div>
      <div className="eventTeamParticipants">{currentTeamEntries}</div>
    </div>
  );
}
