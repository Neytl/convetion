"use client";
import Stats from "convention/components/Stats";
import Table from "convention/components/Table";
import PageInfo from "convention/components/PageInfo";

import { useState, useEffect } from "react";

export default function Content({ dataEndpoint }) {
  const [viewData, setViewData] = useState({
    tables: [],
  });

  const [pathname, setPathname] = useState("");

  useEffect(() => {
    if (!!viewData.stats) return;
    setPathname(window.location.pathname);
    fetch("./fakeData/" + dataEndpoint + ".json")
      .then((response) => response.json())
      .then((data) => {
        setViewData(data);
      });
  }, [viewData.stats, dataEndpoint]);

  return (
    <div id="content">
      <PageInfo pathname={pathname} />
      <Stats statsData={viewData.stats} />
      {viewData.tables.map((table) => (
        <Table
          key={table.tableName}
          tableColumns={table.columnNames}
          tableData={table.tableData}
          tableType={table.tableType}
          tableName={table.tableName}
          maxTeamSize={table.maxTeamSize}
        />
      ))}
    </div>
  );
}
