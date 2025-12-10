import "convention/app/css/table.css";
import TableEntry from "./TableEntry";
import { openTableButtonPopup } from "../popupComponents/Popup";
import SimpleImage from "convention/components/generalComponents/SimpleImage";

export default function Table({
  tableData,
  tableType,
  tableName,
  maxTeamSize,
  deleteDataEntry,
  tableObject,
  pageTables,
}) {
  if (tableData.length == 0) return null;
  let rowIndex = 0;

  let tableColumns = ((tableType) => {
    switch (tableType) {
      case "admin_schools":
        return ["Escuela", "Alumnos"];
      case "school_event":
      case "school_team_event":
        return ["Nombre", "Edad", "Groupo"];
      case "school_students":
        return ["Nombre", "Edad", "Eventos"];
      case "admin_events":
      default:
        return ["Evento", "Participantes", "Tamaño de Equipos", "Categoria"];
    }
  })(tableType);
  let numColumns = tableColumns.length;

  let columns = ((tableType) => {
    switch (tableType) {
      case "admin_schools":
        return "two-columns";
      case "school_event":
      case "school_team_event":
      case "school_students":
        return "three-columns";
      case "admin_events":
      default:
        return "four-columns";
    }
  })(tableType);

  let entryIconSrc = getTableEntryIcon(tableType);
  let tableEntries;
  let tableID = tableName + "Table";
  let newTableData = tableData;

  // Build the table entries
  if (tableType == "school_team_event") {
    let fillInRemainingEntries = function (
      entriesList,
      entriesLeft,
      teamNumberToOpen
    ) {
      for (let i = entriesLeft; i > 0; i--) {
        entriesList.push(
          <div
            key={tableName + "-" + teamNumberToOpen + "-" + i}
            className="tableEntry"
          >
            <div
              className="tableEntryData pointer"
              onClick={() => {
                openTableButtonPopup(
                  "school_team_event_popup",
                  tableName,
                  newTableData,
                  tableObject,
                  teamNumberToOpen,
                  pageTables
                );
              }}
            >
              <div>
                <SimpleImage
                  src={"/images/account.png"}
                  width={30}
                  height={30}
                />
                <SimpleImage src={"/images/add.png"} width={15} height={15} />
              </div>
            </div>
          </div>
        );
      }
    };

    // Build the team objects
    let participants = structuredClone(tableData);
    let teams = [];
    let currentTeamNumber = tableData[0].teamNumber;
    let currentTeam = {
      teamMembers: [],
    };

    participants.sort((a, b) => a.teamNumber - b.teamNumber);
    participants.forEach((participantData) => {
      if (participantData.teamNumber != currentTeamNumber) {
        currentTeamNumber = participantData.teamNumber;
        teams.push(currentTeam);
        currentTeam = {
          teamMembers: [],
        };
      }

      currentTeam.teamMembers.push(participantData);
    });
    teams.push(currentTeam);

    // Add the team age group info
    teams.forEach((team) => {
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
    teams.sort((a, b) => a.sortPriority - b.sortPriority);
    for (let i = 0; i < teams.length; i++) {
      teams[i].teamNumber = i + 1;
    }
    teams.forEach((team) => {
      team.teamMembers.forEach((participantData) => {
        participantData.teamNumber = team.teamNumber;
      });
    });
    participants.sort((a, b) => a.teamNumber - b.teamNumber);
    newTableData = participants;

    // Build the teams entries
    tableEntries = [];

    teams.forEach((teamData) => {
      // Team header
      tableEntries.push(
        <div
          key={"Equipo" + teamData.teamNumber}
          className={"tableEntryHeader schoolEventTable " + teamData.ageGroup}
        >
          <div>{"Equipo " + teamData.teamNumber}</div>
          <div></div>
          <div>{teamData.ageGroup}</div>
        </div>
      );

      // Team members
      teamData.teamMembers.forEach((participantData) => {
        tableEntries.push(
          <TableEntry
            key={participantData.studentID}
            entryIconSrc={entryIconSrc}
            data={participantData}
            tableType={tableType}
            // rowIndex={rowIndex++}
            deleteDataEntry={deleteDataEntry}
          />
        );
      });

      fillInRemainingEntries(
        tableEntries,
        maxTeamSize - teamData.teamMembers.length,
        teamData.teamNumber
      );
    });
  } else if (tableType == "school_students") {
    let currentAgeGroup = "";
    tableEntries = [];

    tableData.forEach((studentData) => {
      if (studentData.ageGroup != currentAgeGroup) {
        currentAgeGroup = studentData.ageGroup;
        tableEntries.push(
          <div
            key={currentAgeGroup}
            className={
              "tableEntryHeader ageGroupTableHeader " + currentAgeGroup
            }
          >
            {currentAgeGroup}
          </div>
        );
      }

      tableEntries.push(
        <TableEntry
          key={rowIndex}
          entryIconSrc={entryIconSrc}
          data={studentData}
          tableType={tableType}
          rowIndex={rowIndex++}
          deleteDataEntry={deleteDataEntry}
        />
      );
    });
  } else {
    tableEntries = tableData.map((entryData) => (
      <TableEntry
        key={rowIndex}
        entryIconSrc={entryIconSrc}
        data={entryData}
        tableType={tableType}
        rowIndex={rowIndex++}
        deleteDataEntry={deleteDataEntry}
      />
    ));
  }

  // Build the table header
  let tableHeader;

  if (tableType != "school_team_event") {
    tableHeader = tableColumns.map((columnName) => (
      <span key={columnName}>{columnName}</span>
    ));
  } else {
    tableHeader = [];
    for (let i = 0; i < numColumns; i++) {
      tableHeader.push(<span key={tableColumns[i]}>{tableColumns[i]}</span>);
    }
  }

  // Build the table
  return (
    <div className={columns}>
      {getTableTopper(
        tableType,
        tableName,
        newTableData,
        tableObject,
        pageTables
      )}
      <div className="table" id={tableID}>
        <div className="tableHeader">{tableHeader}</div>
        <div className="tableEntries" id={tableID + "Entries"}>
          {tableEntries}
        </div>
      </div>
    </div>
  );
}

function getTableEntryIcon(tableType) {
  switch (tableType) {
    case "admin_schools":
      return "/images/school.png";
    case "admin_events":
      return "/images/event.png";
    case "school_event":
    case "school_team_event":
    case "school_students":
    default:
      return "/images/account.png";
  }
}

function getTableButtonText(tableType) {
  switch (tableType) {
    case "admin_schools":
      return "Registrar Escuela";
    case "admin_events":
      return "Registrar Evento";
    case "school_event":
    case "school_team_event":
      return "Editar Evento";
    default:
      return "???";
  }
}

function getTableTopper(
  tableType,
  tableName,
  tableData,
  tableObject,
  pageTables
) {
  if (tableType == "admin_schools") {
    tableName = "Escuelas";
  } else if (tableType == "admin_events") {
    tableName = "Eventos";
  }

  return (
    <div className="tableTopper">
      <span>{tableName}</span>
      {tableType == "school_students" ? null : (
        <div
          className="tableButton"
          onClick={() => {
            openTableButtonPopup(
              tableType + "_popup",
              tableName,
              tableData,
              tableObject,
              null,
              pageTables
            );
          }}
        >
          <span>{getTableButtonText(tableType)}</span>
        </div>
      )}
    </div>
  );
}
