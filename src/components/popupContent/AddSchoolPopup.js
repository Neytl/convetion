// import Image from "next/image";
import TinyImage from "./TinyImage";

export default function AddSchoolPopup() {
  return (
    <div id="addSchoolPopup" className="hidden">
      <form id="loginFields">
        <div className="loginFieldLabel">
          <TinyImage imageSrc="/images/account.png" />
          <label htmlFor="loginUsername">Username</label>
        </div>
        <input type="text" id="loginUsername" />
        <div className="loginFieldLabel">
          <TinyImage imageSrc="/images/password.png" />
          <label htmlFor="loginPassword">Password</label>
        </div>
        <input type="password" id="loginPassword" />
      </form>

      <span id="loginMessage"></span>

      <div id="loginButton">Log In</div>
    </div>
  );
}
