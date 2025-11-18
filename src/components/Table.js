import "convention/app/css/table.css";
import TableEntry from "./TableEntry";
import { openTableButtonPopup } from "./Popup";
import IconSpan from "./IconSpan";
import Image from "next/image";

export default function Table({
  tableColumns,
  tableData,
  tableType,
  tableName,
  maxTeamSize,
  deleteDataEntry,
  tableEventID,
}) {
  if (!tableColumns) {
    return <div>Loading table data...</div>;
  }

  let rowIndex = 0;
  let numColumns = tableColumns.length;

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
        deleteDataEntry={deleteDataEntry}
      />
    ));
  } else {
    tableEntries = [];
    let currentTeam;
    let teamName;
    let currentTeamSize = 0;
    let keyIndex = 0;

    let fillInRemainingEntries = function (entriesList, entriesLeft) {
      for (let i = entriesLeft; i > 0; i--) {
        entriesList.push(
          <div key={currentTeam + keyIndex++} className="tableEntry">
            <div className="tableEntryData pointer">
              <div>
                <Image
                  src={"/images/account.png"}
                  alt=""
                  width={30}
                  height={30}
                />
                <Image src={"/images/add.png"} alt="" width={15} height={15} />
              </div>
            </div>
          </div>
        );
      }
    };

    tableData.forEach((entryData) => {
      teamName = entryData.team;

      // New team
      if (teamName != currentTeam) {
        if (!!currentTeam) {
          fillInRemainingEntries(tableEntries, maxTeamSize - currentTeamSize);
        }

        currentTeam = teamName;
        tableEntries.push(
          <div key={teamName} className="tableEntryHeader">
            <div>{teamName}</div>
            <div></div>
            <div>{"Corederitos"}</div>
          </div>
        );
        currentTeamSize = 0;
      }

      // Add the data entry
      currentTeamSize++;
      tableEntries.push(
        <TableEntry
          key={rowIndex}
          entryIconSrc={entryIconSrc}
          data={entryData}
          tableType={tableType}
          rowIndex={rowIndex++}
          deleteDataEntry={deleteDataEntry}
        />
      );
    });

    fillInRemainingEntries(tableEntries, maxTeamSize - currentTeamSize);
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
      {getTableTopper(tableType, tableName, tableData, tableEventID)}
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
      return "Add School";
    case "admin_events":
      return "Add Event";
    case "school_event":
    case "school_team_event":
      return "Edit Event";
    case "school_students":
    default:
      return "Add Student";
  }
}

function getTableTopper(tableType, tableName, tableData, tableEventID) {
  return (
    <div className="tableTopper">
      <span>{tableName}</span>
      <div
        className="tableButton"
        onClick={() => {
          openTableButtonPopup(
            tableType + "_popup",
            tableName,
            tableData,
            tableEventID
          );
        }}
      >
        <span>{getTableButtonText(tableType)}</span>
        <div className="tableButtonDropdown"></div>
      </div>
    </div>
  );
}
