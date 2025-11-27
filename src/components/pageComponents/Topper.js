import Image from "next/image";
import "convention/app/css/nav.css";

export default function Topper() {
  return (
    <div id="topper">
      <div id="user">
        <Image
          src="/images/account.png"
          className="invert"
          alt="School"
          width={15}
          height={15}
        />
        <span>Admin</span>
      </div>
      <div id="tag">
        <Image
          src="/images/event.png"
          className="invert"
          alt="School"
          width={30}
          height={30}
        />
        <span>Mini-Convention 2026</span>
      </div>
    </div>
  );
}
