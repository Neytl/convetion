import "convention/app/css/table.css";
import TableEntry from "./TableEntry";

export default function Table({
  tableColumns,
  tableData,
  tableType
}) {  
  if (!tableColumns) {
    return <div>Loading table data...</div>;
  }
  
  let rowIndex = 0;
  
  let columns = ((numColumns) => {
    switch(numColumns) {
      case 2:
        return "two-columns";
      case 3:
        return "three-columns";
      case 4:
      default:
        return "four-columns";
    }
  })(tableColumns.length);

  let entryIconSrc = ((tableType) => {
    switch(tableType) {
      case "admin_schools":
        return "/images/school.png";
      case "admin_events":
      case "school_events":
        return "/images/account.png";
      case "school_students":
      default:
        return "/images/account.png";
    }
  })(tableType);

  return (
    <div className={columns}>
      <div className="tableButtonContainer">
        <div className="tableButton">
          <span>Add School</span>
          <div className="tableButtonDropdown">

          </div>
        </div>
      </div>
      <div className="table">
        <div className="tableHeader">
          {
            tableColumns.map(columnName => (
              <span key={columnName}>{columnName}</span>
            ))
          }
        </div>
        <div className="tableEntries">
          {
            tableData.map(entryData => (
              <TableEntry key={rowIndex++} entryIconSrc={entryIconSrc} dataEntries={Object.entries(entryData).map(a => a[1])} tableType={tableType} />
            ))
          }
        </div>
      </div>
    </div>
  );
}
