import Nav from "convention/components/Nav";
import Content from "convention/components/Content";
import Topper from "convention/components/Topper";

export default function AdminEventsPage() {
  return (
    <div id="page">
      <Topper />
      <div id="split">
        <Nav />
        <Content dataEndpoint="fakeAdminSchoolsData" />
      </div>
    </div>
  );
}
