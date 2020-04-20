import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import Iframe from "react-iframe";

function App() {
  const [webcam, setWebcam] = useState(false);
  const [hasError, setErrors] = useState(false);

  async function fetchData() {
    // webcam with id 1499065941
    const res = await fetch(
      "https://api.windy.com/api/webcams/v2/list/webcam=1499065941?show=webcams:image,location,player&key=FVKqXhuTWBoicKC5bzKgJW9re2xjxNtN"
    );
    res
      .json()
      .then((res) => {
        const { result } = res;
        const { webcams } = result;
        const [firstWebcam] = webcams;
        console.log(firstWebcam);
        setWebcam(firstWebcam);
      })
      .catch((err) => setErrors(err));
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="App">
      <div>{webcam && <img alt="" src={webcam.image.current.preview} />}</div>
      <div>{webcam && <Iframe url={webcam.player.lifetime.embed} />}</div>
    </div>
  );
}

export default App;
