import "convention/app/css/stats.css";
import Stat from "convention/components/pageComponents/Stat";

export default function Stats({ statsData }) {
  if (!statsData) {
    return;
  }

  return (
    <div id="stats">
      {statsData.map((stat) => (
        <Stat
          key={stat.title}
          imageSrc={lookupIcon(stat.title)}
          title={lookupTitle(stat.title)}
          value={stat.value}
        />
      ))}
    </div>
  );
}

function lookupIcon(statType) {
  switch (statType) {
    case "Schools":
      return "/images/school.png";
    case "Students":
      return "/images/account.png";
    case "Participants":
      return "/images/account.png";
    case "Events":
      return "/images/event.png";
    default:
      return "/images/???.png";
  }
}

function lookupTitle(statType) {
  switch (statType) {
    case "Schools":
      return "Escuelas";
    case "Students":
      return "Alumnos";
    case "Participants":
      return "Participantes";
    case "Events":
      return "Eventos";
    default:
      return "???";
  }
}
