import "./App.css";
import axios from "axios";
import React, { useState } from "react";
import { Login } from "./Components/Login";

function App() {
  const [image, setImage] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleClick = () => {
    axios.post("http://localhost:5000/", image).then((res) => {
      console.log("Axios response: ", res);
      const imageUrl = res["data"]["url"];
      setImage(imageUrl);
    });
  };

  const handleFileInput = (e) => {
    console.log("handleFileInput working!");
    console.log(e.target.files[0]);
    const formData = new FormData();
    formData.append("my-image-file", e.target.files[0], e.target.files[0].name);
    setImage(formData);
  };

  const setLogin = (isLoggedInx) => {
    setIsLoggedIn(isLoggedInx);
  };

  const Logout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("token");
  };

  return (
    <div className="App">
      <h1 className="EDA">Emotion Detection Application</h1>
      {isLoggedIn ? <></> : <Login onLogin={setLogin}>Login</Login>}

      {isLoggedIn ? (
        <>
          {/* <h1>Emotion Detection</h1> */}
          <button className="Detect" onClick={handleClick}>
            Detect
          </button>
          <input type="file" onChange={handleFileInput} />
          <img className="photo" src={image} />
        </>
      ) : (
        <></>
      )}
      {isLoggedIn ? (
        <>
          <button onClick={Logout}> Logout </button>

          <br></br>
        </>
      ) : (
        <></>
      )}
    </div>
  );
}

export default App;
