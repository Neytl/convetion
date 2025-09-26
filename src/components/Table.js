import "convention/app/css/table.css";
import TableEntry from "./TableEntry";
import { openTableButtonPopup } from "./Popup";

export default function Table({ tableColumns, tableData, tableType }) {
  if (!tableColumns) {
    return <div>Loading table data...</div>;
  }

  let rowIndex = 0;

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
  })(tableColumns.length);

  let entryIconSrc = getTableEntryIcon(tableType);

  return (
    <div className={columns}>
      {getTableTopper(tableType)}
      <div className="table">
        <div className="tableHeader">
          {tableColumns.map((columnName) => (
            <span key={columnName}>{columnName}</span>
          ))}
        </div>
        <div className="tableEntries">
          {tableData.map((entryData) => (
            <TableEntry
              key={rowIndex++}
              entryIconSrc={entryIconSrc}
              dataEntries={Object.entries(entryData).map((a) => a[1])}
              tableType={tableType}
            />
          ))}
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
    case "school_events":
      return "/images/account.png";
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
    case "school_students":
    case "school_events":
    default:
      return "Add Student";
  }
}

function getTableTopperText(tableType) {
  switch (tableType) {
    case "admin_schools":
      return "Schools";
    case "admin_events":
      return "Events";
    case "school_events":
      return "[Event Name]";
    case "school_students":
    default:
      return "Students";
  }
}

function getTableTopper(tableType) {
  return (
    <div className="tableTopper">
      <span>{getTableTopperText(tableType)}</span>
      <div
        className="tableButton"
        onClick={() => {
          openTableButtonPopup(tableType);
        }}
      >
        <span>{getTableButtonText(tableType)}</span>
        <div className="tableButtonDropdown"></div>
      </div>
    </div>
  );
}
