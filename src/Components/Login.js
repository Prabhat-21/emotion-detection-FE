import { GoogleLogin } from "@react-oauth/google";
import "./Login.css";
import React from "react";

export const Login = ({ onLogin }) => {
  return (
    <div className="Login">
      <div className="background-image"></div>
      <button>
        <GoogleLogin
          clientId="534042040906-qff5ftkdcklm1sfrs99ct4s794gkcvbv-www.apps.googleusercontent.com"
          onSuccess={(credentialResponse) => {
            console.log(credentialResponse);
            const authDetails = {
              response: credentialResponse,
            };
            fetch("http://localhost:5000/auth", {
              method: "POST",
              body: JSON.stringify(authDetails),
              headers: {
                "Content-type": "application/json; charset=UTF-8",
              },
            })
              .then((response) => response.json())
              .then((data) => {
                const token = data["token"];
                localStorage.setItem("token", token);
                console.log(data);
                onLogin(true);
              })

              .catch((err) => {
                console.log(err.message);
              });
          }}
          onError={() => {
            console.log("Login Failed");
          }}
        />
      </button>
    </div>
  );
};
