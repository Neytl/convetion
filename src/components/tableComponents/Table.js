import "convention/app/css/table.css";
import TableEntry from "./TableEntry";
import { openTableButtonPopup } from "../popupComponents/Popup";
import Image from "next/image";

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
        return ["School", "# Students"];
      case "school_event":
      case "school_team_event":
        return ["Name", "Age", "Group"];
      case "school_students":
        return ["Name", "Age", "Group", "Events"];
      case "admin_events":
      default:
        return ["Event", "Participants", "Team Size", "Category"];
    }
  })(tableType);
  let numColumns = tableColumns.length;

  let columns = ((tableType) => {
    switch (tableType) {
      case "admin_schools":
        return "two-columns";
      case "school_event":
      case "school_team_event":
        return "three-columns";
      case "school_students":
      case "admin_events":
      default:
        return "four-columns";
    }
  })(tableType);

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
    let currentTeamNumber;
    let teamNumber;
    let currentTeamSize = 0;
    let keyIndex = 0;

    let fillInRemainingEntries = function (
      entriesList,
      entriesLeft,
      teamNumberToOpen
    ) {
      for (let i = entriesLeft; i > 0; i--) {
        entriesList.push(
          <div key={tableName + "-" + keyIndex++} className="tableEntry">
            <div
              className="tableEntryData pointer"
              onClick={() => {
                openTableButtonPopup(
                  "school_team_event_popup",
                  tableName,
                  tableData,
                  tableObject,
                  teamNumberToOpen,
                  pageTables
                );
              }}
            >
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
      teamNumber = entryData.teamNumber;

      // New team
      if (currentTeamNumber != teamNumber) {
        if (!!currentTeamNumber) {
          fillInRemainingEntries(
            tableEntries,
            maxTeamSize - currentTeamSize,
            currentTeamNumber
          );
        }

        currentTeamNumber = teamNumber;
        tableEntries.push(
          <div key={"Team" + teamNumber} className="tableEntryHeader">
            <div>{"Team " + teamNumber}</div>
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

    fillInRemainingEntries(
      tableEntries,
      maxTeamSize - currentTeamSize,
      currentTeamNumber
    );
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
      {getTableTopper(tableType, tableName, tableData, tableObject, pageTables)}
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

function getTableTopper(
  tableType,
  tableName,
  tableData,
  tableObject,
  pageTables
) {
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
