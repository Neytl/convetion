"use client";
import Nav from "convention/components/Nav";
import Content from "convention/components/Content";
import Topper from "convention/components/Topper";
import { useState } from "react";

export default function AdminSchoolsPage() {
  const [pageSchoolData, setPageSchoolData] = useState(null);

  return (
    <div id="page">
      <Topper />
      <div id="split">
        <Nav pageSchoolData={pageSchoolData} />
        <Content setPageSchoolData={setPageSchoolData} />
      </div>
    </div>
  );
}
