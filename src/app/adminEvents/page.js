import Nav from "convention/components/Nav";
import Content from "convention/components/Content";
import Popup from "convention/components/Popup";

export default function AdminEventsPage() {
  return (
    <div id="page">
      <Nav />
      <Content dataEndpoint="fakeAdminEventsData" />
      <Popup />
    </div>
  );
}
