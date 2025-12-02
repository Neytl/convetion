"use client";
import "convention/app/css/loginPage.css";
import "convention/app/css/popup.css";

import TinyImage from "convention/components/popupComponents/TinyImage";
import Image from "next/image";

export default function LoginPage() {
  return (
    <div id="page">
      <div id="split">
        <div id="loginSplashConatiner">
          <div id="splashArt">
            <div id="titleContainer">
              <div id="title">
                <Image
                  src="/images/logo.png"
                  className="invert"
                  alt="School"
                  width={85}
                  height={85}
                />
                <span>Mini-Convención</span>
              </div>
              <span id="subtitle">Inscripción 2026</span>
            </div>
          </div>
        </div>
        <div id="loginSplit">
          <div id="loginTitle">Iniciar Sesión Para Registrar Tu Escuela</div>
          <div id="errorMessageContainer" className="hidden">
            <Image
              id="errorImage"
              alt=""
              src={"/images/error.png"}
              width={25}
              height={25}
            />
            <div id="errorMessage"></div>
            <div
              id="closeErrorMessageButton"
              onClick={() => {
                document
                  .getElementById("errorMessageContainer")
                  .classList.add("hidden");
              }}
            >
              &times;
            </div>
          </div>
          <form id="loginContainer" className="popupFields" action={login}>
            <div className="formInputContainer">
              <div className="inputLabel">
                <TinyImage imageSrc={"account.png"} />
                <label htmlFor="username">Usuario:</label>
              </div>
              <input
                type="text"
                id="username"
                required
                autoComplete="username"
              />
            </div>
            <div className="formInputContainer">
              <div className="inputLabel">
                <TinyImage imageSrc={"password.png"} />
                <label htmlFor="password">Contraseña:</label>
              </div>
              <input
                required
                type="password"
                id="password"
                autoComplete="current-password"
              />
            </div>
            <button type="submit" id="loginButton" className="button">
              Entrar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
const get = (id) => {
  return document.getElementById(id);
};

const login = (event) => {
  // event.preventDefault();

  let payload = {
    username: get("username").value,
    password: get("password").value,
  };

  if (!payload.username || !payload.password) {
    get("errorMessage").innerHTML =
      "El nombre de usuario o la contraseña son incorrectos";
    get("errorMessageContainer").classList.remove("hidden");
    return;
  }

  // get("password").value = "";

  fetch("https://localhost:44398/api/Login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  }).then((response) => {
    if (response.ok) {
      // Success! Valid Login
      response.json().then((userEntity) => {
        userEntity.timeLoggedIn = Date.now();
        localStorage.setItem("loggedInUser", JSON.stringify(userEntity));
        console.log(userEntity);

        // Go to the corresponding page
        if (userEntity.adminAccess) {
          window.location.href = "./adminSchools";
        } else {
          window.location.href =
            "./schoolStudents?school=" + userEntity.schoolID;
        }
      });
    } else if (response.status === 401) {
      // Unauthorized
      get("errorMessage").innerHTML =
        "El nombre de usuario o la contraseña son incorrectos";
      get("errorMessageContainer").classList.remove("hidden");
    } else if (response.status === 503) {
      // Service Unavailable
      get("errorMessage").innerHTML =
        "El periodo de inscripción ya está cerrado";
      get("errorMessageContainer").classList.remove("hidden");
    }
  });
};
