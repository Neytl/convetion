import "convention/app/css/stats.css";
import Stat from "convention/components/Stat";

export default function Stats({
  statsData
}) {
  if (!statsData) {
    return <div>Loading stats...</div>;
  }
  
  let lookupIcon = (statType) => {
    switch(statType) {
      case "Schools":
        return "/images/school.png"
      case "Students":
        return "/images/account.png"
      case "Participants":
        return "/images/account.png"
      case "Events":
        return "/images/event.png"
      default:
        return "/images/???.png"
    }
  };

  return (
    <div id="stats">
      {
          statsData.map(stat => (
            <Stat key={stat.title} imageSrc={lookupIcon(stat.title)} title={stat.title} value={stat.value} />
          ))
      }
    </div>
  );
}
