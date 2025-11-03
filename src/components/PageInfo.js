import "convention/app/css/globals.css";

const oneDay = 24 * 60 * 60 * 1000;
const registrationCloseDate = new Date(2026, 2 - 1, 1);
const maximumEvents = 7;

export default function PageInfo({ pathname }) {
  const daysLeft = Math.round(
    Math.abs((registrationCloseDate - Date.now()) / oneDay)
  );

  return (
    <div id="pageInfo">
      <div id="timeLeft">{"Registration closes in " + daysLeft + " days."}</div>
      <div id="pageSpecificInfo">{getPageInfo(pathname)}</div>
    </div>
  );
}

function getPageInfo(pathname) {
  switch (pathname) {
    case "/":
      return "On this page, you can print out a specific school's information, as well as navigate to a school's database page. To register a student or add a student to an event, click the 'Students' button under that school.";
    case "/adminEvents":
      return "On this page, you can create an event for students to register to. To register a student to an event, you must first go to that student's school page and hit 'Events' in the navigation.";
    case "/schoolStudents":
      return "On this page, you can register students to your school. Click on a student in the table to see their events. To add a student to an event, click on 'Events' in the navigation.";
    case "/schoolEvents":
      return (
        "On this page, you can register a student to an event. To register a student for an event not yet on page, hit the 'New Event' button. Each student can only be registered to a miximum of " +
        maximumEvents +
        " events. You can see a students total number of events in the students page."
      );
    default:
      return "";
  }
}
