import SimpleImage from "convention/components/generalComponents/SimpleImage";
import "convention/app/css/nav.css";
import { useEffect, useState } from "react";
import { goHome } from "convention/app/library";

export default function Topper() {
  const [loggedInUser, setLoggedInUser] = useState({});

  useEffect(() => {
    if (!loggedInUser || !!loggedInUser.username) return;
    let userString = localStorage.getItem("loggedInUser");

    if (!userString) {
      goHome();
      return;
    }

    setLoggedInUser(JSON.parse(userString));
  }, [loggedInUser]);

  if (!loggedInUser) return null;

  let imageSrc = !loggedInUser.adminAccess
    ? "/images/school.png"
    : "/images/account.png";

  return (
    <div id="topper">
      <div id="user">
        <SimpleImage
          src={imageSrc}
          className="invert"
          alt="School"
          width={20}
          height={20}
        />
        <span>{loggedInUser.username}</span>
        <div id="logoutButton" onClick={logout}>
          <span>Cerrar Session</span>
        </div>
      </div>
      <div id="tag">
        <SimpleImage
          src="/images/logo.png"
          className="invert"
          alt="School"
          width={42}
          height={42}
        />
        <span>Mini Convención 2026</span>
      </div>
    </div>
  );
}

const logout = () => {
  localStorage.removeItem("loggedInUser");
  goHome();
};
