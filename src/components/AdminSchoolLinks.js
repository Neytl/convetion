import Image from "next/image";
import "convention/app/css/nav.css";
import NavLink from "convention/components/NavLink";

export default function AdminSchoolLinks({ schoolData }) {
  if (!schoolData) {
    return <div></div>;
  }

  return (
    <div id="adminSchoolLinksContainer">
      <div id="adminSchoolLinksHeader">
        <Image src="/images/school.png" alt="School" width={30} height={30} />
        <span>{schoolData.schoolName}</span>
      </div>
      <div id="adminSchoolLinks">
        <NavLink
          name={"Students"}
          href={"/schoolStudents?school=" + schoolData.schoolID}
          iconSrc={"/images/account.png"}
        />
        <NavLink
          name={"Events"}
          href={"/schoolEvents?school=" + schoolData.schoolID}
          iconSrc={"/images/event.png"}
        />
      </div>
    </div>
  );
}
