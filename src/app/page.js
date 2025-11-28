import "convention/app/css/loginPage.css";
import "convention/app/css/popup.css";
import Topper from "convention/components/pageComponents/Topper";

import TinyImage from "convention/components/popupComponents/TinyImage";

import Image from "next/image";

export default function LoginPage() {
  return (
    <div id="page">
      <div id="split">
        <div id="loginSplashConatiner">
          <div id="splashArt">
            <div id="titleContainer">
              <Image
                src="/images/logo.png"
                className="invert"
                alt="School"
                width={70}
                height={70}
              />
              <span>Mini-Convention</span>
              <span>2026</span>
              <span>Registration</span>
            </div>
          </div>
        </div>
        <div id="loginSplit">
          <div id="loginTitle">Sign In To Registration</div>
          <form id="loginContainer" className="popupFields">
            <div className="formInputContainer">
              <div className="inputLabel">
                <TinyImage imageSrc={"account.png"} />
                <label htmlFor="username">Username:</label>
              </div>
              <input
                // onInput={clearError}
                type="text"
                id="username"
                autocomplete="username"
                // placeholder="Username"
                // onKeyDown={onPopupInput}
                // data-tab="A1"
              />
            </div>
            <div className="formInputContainer">
              <div className="inputLabel">
                <TinyImage imageSrc={"password.png"} />
                <label htmlFor="password">Password:</label>
              </div>
              <input
                // onInput={clearError}
                type="password"
                id="password"
                autocomplete="current-password"
                // placeholder="Password"
                // onKeyDown={onPopupInput}
                // data-tab="A1"
              />
            </div>
            <div type="buton" id="loginButton" className="button">
              Submit
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
