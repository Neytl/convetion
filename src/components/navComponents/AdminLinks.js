import "convention/app/css/nav.css";
import NavLink from "convention/components/navComponents/NavLink";
import SimpleImage from "convention/components/generalComponents/SimpleImage";

export default function AdminLinks({ schoolData, loggedInUser, pathname }) {
  let schoolID = schoolData.schoolID;
  if (!schoolID) schoolID = loggedInUser.schoolID;
  let schoolName = schoolData.schoolName;

  return (
    <div id="links">
      <div id="adminLinksContainer">
        <NavLink
          name={"Escuelas"}
          href={"/adminEscuelas"}
          iconSrc={"/images/school.png"}
          currentPage={pathname == "/"}
        />
        <NavLink
          name={"Eventos"}
          href={"/adminEventos"}
          iconSrc={"/images/event.png"}
          currentPage={pathname == "/adminEventos"}
        />
      </div>
      {!schoolName ? null : (
        <div
          id="schoolLinksContainer"
          className={
            pathname == "/schoolStudents" || pathname == "/schoolEvents"
              ? "currentPage"
              : ""
          }
        >
          <div id="schoolLinksHeader">
            <SimpleImage
              src="/images/school.png"
              alt="School"
              width={30}
              height={30}
            />
            <span>{schoolName}</span>
          </div>
          <div id="schoolLinks">
            <NavLink
              name={"Alumnos"}
              href={"/alumnos?school=" + schoolID}
              iconSrc={"/images/account.png"}
              currentPage={pathname == "/schoolStudents"}
            />
            {schoolData.numStudents > 0 ? (
              <NavLink
                name={"Eventos - Registro"}
                href={"/eventos?school=" + schoolID}
                iconSrc={"/images/event.png"}
                currentPage={pathname == "/schoolEvents"}
              />
            ) : null}
          </div>
        </div>
      )}
    </div>
  );
}
