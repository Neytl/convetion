import Nav from "convention/components/Nav";
import Content from "convention/components/Content";
import Popup from "convention/components/Popup";

export default function SchoolStudentsPage() {
  return (
    <div id="page">
      <Nav />
      <Content dataEndpoint="fakeSchoolStudentsData" />
      <Popup />
    </div>
  );
}
