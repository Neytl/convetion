import SoloEventPrintTable from "./SoloEventPrintTable";
import TeamEventPrintTable from "./TeamEventPrintTable";

export default function EventPrintTable({ tableData }) {
  // Empty table
  if (tableData.tableData.length == 0) {
    return;
  }

  if (tableData.tableType == "event") {
    return <SoloEventPrintTable tableData={tableData} />;
  }

  return <TeamEventPrintTable tableData={tableData} />;
}
