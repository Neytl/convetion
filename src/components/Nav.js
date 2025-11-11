import "convention/app/css/nav.css";
import NavLink from "convention/components/NavLink";
import AdminSchoolLinks from "convention/components/AdminSchoolLinks";
import AdminLinks from "convention/components/AdminLinks";

export default function Nav({ pageSchoolData }) {
  console.log("Page school data: ", pageSchoolData);

  return (
    <div id="header">
      <div id="links">
        <NavLink name={"Schools"} href={"/"} iconSrc={"/images/school.png"} />
        <NavLink
          name={"Events"}
          href={"/adminEvents"}
          iconSrc={"/images/event.png"}
        />
        <AdminSchoolLinks schoolData={pageSchoolData} />
      </div>
    </div>
  );
}
