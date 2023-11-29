import "./App.css";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Login } from "./Components/Login";
import CustomWebcam from "./Components/CustomWebcam";

function App() {
  const [image, setImage] = useState(null);
  const [formData, setFormData] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("token") !== null) {
      setIsLoggedIn(true);
    }
  });

  const handleClick = () => {
    const headers = {
      token: localStorage.getItem("token"),
    };
    axios
      .post("http://3.108.58.182:5000/", formData, { headers: headers })
      .then((res) => {
        console.log("Axios response: ", res);
        const imageUrl = res["data"]["url"];
        setImage(imageUrl);
      });
  };

  const handleFileInput = (e) => {
    console.log("handleFileInput working!");
    console.log(e.target.files[0]);
    console.log(e);
    const formData1 = new FormData();
    formData1.append(
      "my-image-file",
      e.target.files[0],
      e.target.files[0].name
    );

    setImage(URL.createObjectURL(e.target.files[0]));
    setFormData(formData1);
    console.log(formData1);
  };

  const setLogin = (isLoggedInx) => {
    setIsLoggedIn(isLoggedInx);
  };

  const Logout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("token");
  };

  const captureImageSrc = async (capturedImg) => {
    const formData = new FormData();
    // console.log(capturedImg);

    const image = document.getElementById("webcamCaptured");
    const canvas = document.createElement("canvas");
    canvas.width = 600;
    canvas.height = 450;
    console.log(image.width);
    console.log(image.height);
    // console.log(image);
    const ctx = canvas.getContext("2d");
    ctx.drawImage(image, 0, 0, 600, 450);
    const pngData = canvas.toDataURL("image/png");
    console.log(pngData);
    console.log(canvas);
    const b = canvas.toBlob(
      (blob) => {
        console.log(blob);
        formData.append("my-image-file", blob, "test.png");
      },
      "image/png",
      0.95
    );
    console.log(b);

    // console.log(formData);
    setFormData(formData);
    setImage();
  };

  return (
    <div className="App">
      <h1 className="EDA">Emotion Detection Application</h1>
      <meta
        http-equiv="Content-Security-Policy"
        content="upgrade-insecure-requests"
      ></meta>
      {isLoggedIn ? <></> : <Login onLogin={setLogin}>Login</Login>}
      {isLoggedIn ? (
        <>
          <CustomWebcam captureImage={captureImageSrc}></CustomWebcam>
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
