import "convention/app/css/table.css";
import TableEntry from "./TableEntry";
import { openTableButtonPopup } from "./Popup";
import IconSpan from "./IconSpan";

export default function Table({
  tableColumns,
  tableData,
  tableType,
  tableName,
  maxTeamSize,
}) {
  if (!tableColumns) {
    return <div>Loading table data...</div>;
  }

  let rowIndex = 0;
  let numColumns = tableColumns.length;
  if (tableType == "school_team_event") numColumns--;

  let columns = ((numColumns) => {
    switch (numColumns) {
      case 2:
        return "two-columns";
      case 3:
        return "three-columns";
      case 4:
      default:
        return "four-columns";
    }
  })(numColumns);

  let entryIconSrc = getTableEntryIcon(tableType);
  let tableEntries;
  let tableID = tableName + "Table";

  // Build the table entries
  if (tableType != "school_team_event") {
    tableEntries = tableData.map((entryData) => (
      <TableEntry
        key={rowIndex}
        entryIconSrc={entryIconSrc}
        data={entryData}
        tableType={tableType}
        rowIndex={rowIndex++}
      />
    ));
  } else {
    tableEntries = [];
    let currentTeam;
    let teamData;
    let currentTeamSize = 0;

    tableData.forEach((entryData) => {
      teamData = entryData["Team #"];

      // New team
      if (teamData != currentTeam) {
        if (tableEntries.length != 0 && currentTeamSize < maxTeamSize) {
          tableEntries.push(addToTeamButton(teamData));
        }

        currentTeam = teamData;
        tableEntries.push(
          <div className="tableEntryHeader">{"Team " + teamData}</div>
        );

        currentTeamSize = 0;
      }

      // Add the data entry
      currentTeamSize++;

      let entryDataCopy = { ...entryData };
      delete entryDataCopy["Team #"];

      tableEntries.push(
        <TableEntry
          key={rowIndex}
          entryIconSrc={entryIconSrc}
          dataEntries={Object.entries(entryDataCopy).map((a) => a[1])}
          tableType={tableType}
          rowIndex={rowIndex++}
        />
      );
    });

    if (currentTeamSize < maxTeamSize) {
      tableEntries.push(addToTeamButton(teamData));
    }
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
      {getTableTopper(tableType, tableName)}
      <div className="table" id={tableID}>
        <div className="tableHeader">{tableHeader}</div>
        <div className="tableEntries">{tableEntries}</div>
      </div>
    </div>
  );
}

function addToTeamButton(teamNumber) {
  return (
    <div className="tableEntryButtonContainer">
      <IconSpan
        imageSrc="/images/add.png"
        text="Participant"
        specialClass="tableEntryButton"
      />
    </div>
  );
}

function getTableEntryIcon(tableType) {
  switch (tableType) {
    case "admin_schools":
      return "/images/school.png";
    case "admin_events":
    case "school_event":
    case "school_team_event":
      return "/images/event.png";
    case "school_students":
    default:
      return "/images/account.png";
  }
}

function getTableButtonText(tableType) {
  switch (tableType) {
    case "admin_schools":
      return "Add School";
    case "admin_events":
      return "Add Event";
    case "school_event":
      return "Add Participant";
    case "school_team_event":
      return "Add Team";
    case "school_students":
    default:
      return "Add Student";
  }
}

function getTableTopper(tableType, tableName) {
  return (
    <div className="tableTopper">
      <span>{tableName}</span>
      <div
        className="tableButton"
        onClick={() => {
          openTableButtonPopup(tableType + "_popup");
        }}
      >
        <span>{getTableButtonText(tableType)}</span>
        <div className="tableButtonDropdown"></div>
      </div>
    </div>
  );
}
