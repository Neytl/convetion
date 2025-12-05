import "convention/app/css/globals.css";

const oneDay = 24 * 60 * 60 * 1000;
const registrationCloseDate = new Date(2026, 2 - 1, 1);
const maximumEvents = 7;

export default function PageInfo({ pathname, pageData }) {
  const daysLeft = Math.round(
    Math.abs((registrationCloseDate - Date.now()) / oneDay)
  );

  return (
    <div id="pageInfo">
      <div id="timeLeft">
        {"La inscripción cierra en " + daysLeft + " días."}
      </div>
      <div id="pageSpecificInfo">{getPageInfo(pathname, pageData)}</div>
    </div>
  );
}

function getPageInfo(pathname, pageData) {
  console.log(pageData);
  switch (pathname) {
    case "/":
      return "En esta página, puede imprimir la información de inscripción escolar. También puede abrir la página de registro de cada escuela. Para inscribir a un alumno o registrarlo para un evento, haga clic en su escuela y seleccione el botón de 'Estudiantes' o 'Eventos'.";
    // return "On this page, you can print out school registration information, as well as navigate to a school's database page. To register a student or add a student to an event, click on the school and hit the 'Students' or 'Events' button.";
    case "/adminEvents":
      return "En esta página, puede imprimir la lista de eventos y participantes. También puede registrar un evento para que aparece en la lista de eventos de cada escuela. Para registrar un alumno a un evento, debe ir a la página de escuela de ese alumno. Todas las páginas de las escuelas se encuentran en la navegación 'Escuelas'.";
    // return "On this page, you can print out events and their participants. You can also create an event for students to register to. To register a student to an event, you must go to that student's school page. All school pages are linked in the 'Schools' page.";
    case "/schoolStudents":
      if (!pageData || pageData.numStudents == 0) {
        return "En esta página, puede registrar los alumnos de su escuela. Haga clic en el botón 'Registrar Alumno' para empezar.";
      }

      let isAdmin = JSON.parse(
        localStorage.getItem("loggedInUser")
      ).adminAccess;

      return (
        "En esta página, puede registrar los alumnos de su escuela. Haga clic en la tabla para ver los eventos que estan registrado a cada alumno. Para registrar un alumno a un evento, haga clic en '" +
        (isAdmin ? "Eventos - Registro" : "Eventos") +
        "' en la navegación."
      );
    // return "On this page, you can register students to your school. Click on a student in the table to see the events they are registered for. To add a student to an event, click on 'Events' in the navigation.";
    case "/schoolEvents":
      return (
        "En esta página, puede registrar un alumno a un evento. Para ver la lista de eventos, haga clic en el botón 'Editar Eventos'. Cada alumno solo puede registrarse en un máximo de " +
        maximumEvents +
        " eventos."
      );
    // return (
    //     "On this page, you can register a student to an event. To register a student for an event, hit the 'Edit Events' button. Each student can only be registered to a maximum of " +
    //     maximumEvents +
    //     " total events."
    //   );
    default:
      return "";
  }
}
