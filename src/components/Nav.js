import Image from "next/image";
import "convention/app/css/nav.css";
import NavLink from "convention/components/NavLink";

export default function Nav() {
  return (
    <div id="header">
      <div id="user">
        <Image src="/images/school.png" alt="School" width={30} height={30} />
        <span>School Name</span>
      </div>
      <div id="links">
        <NavLink name={"Admin - Schools"} href={"/"} iconSrc={"/images/school.png"}/>
        <NavLink name={"Admin - Events"} href={"/adminEvents"} iconSrc={"/images/event.png"}/>
        <NavLink name={"School - Students"} href={"/schoolStudents"} iconSrc={"/images/school.png"}/>
        <NavLink name={"School - Events"} href={"/schoolEvents"} iconSrc={"/images/event.png"}/>
      </div>
    </div>
  );
}
