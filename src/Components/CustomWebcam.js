import Webcam from "react-webcam";
import { useRef } from "react";
import { useState } from "react";
import { useCallback } from "react";

function CustomWebcam({ captureImage }) {
  const webcamRef = useRef(null);
  const [imgSrc, setImgSrc] = useState(null);

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImgSrc(imageSrc);
    // captureImage(imageSrc);
  }, [webcamRef]);

  return (
    <div className="container">
      {imgSrc ? (
        <>
          <img
            onLoad={captureImage}
            id="webcamCaptured"
            src={imgSrc}
            alt="webcam"
          />
          <div className="btn-container">
            <button onClick={() => setImgSrc(null)}> Capture again</button>
          </div>
        </>
      ) : (
        <>
          <Webcam height={700} width={600} ref={webcamRef} />
          <div className="btn-container">
            <button onClick={capture}> Capture Photo</button>
          </div>
        </>
      )}

      {/* <Webcam height={600} width={600} /> */}
    </div>
  );
}

export default CustomWebcam;
