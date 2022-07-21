import logo from "./logo.svg";
import "./App.css";
import { memo, useEffect, useRef, useState, useTransition } from "react";
import { useDispatch, useSelector } from "react-redux";
import Level1 from "./component/Level1";
import Test from "./component/Test";
import Level2 from "./component/Level2";
import ReactPlayer from "react-player";
import jwt_decode from "jwt-decode";
import moment from "moment";
import TestKonva from "./component/Konva/TestKonva";

let url='https://admin-brainflix.dedicateddevelopers.us/api/'

function App() {
  const [step, setStep] = useState(0);
  const ref = useRef();
  const [playing, setPlaying] = useState(true);
  const iref = useRef(null);


  useEffect(()=>{
    if(ref!==null){
   
     

    }
  },[ref])

  const handleSkip=()=>{
    ref.current.seekTo(parseFloat(150),'seconds');
  }

  // console.log(document.getElementById('myframe').contentWindow.document.body.innerHTML )

  return (
    <div className="App">
      {/* {step === 0 && (
        <>
          <Level1 />
          <button onClick={nextStep}>next</button>
        </>
      )}
        {step === 1 && (
        <>
          <Level2 />
          <button onClick={nextStep}>next</button>
        </>
      )} */}

      {/* <ReactPlayer
        url={`${url}/video-management/fetchVideoByURL?videoId=LXb3EKWsInQ`}
        
        onProgress={(e) => console.log(e,"prgres")}
        // onPlay={(e) => console.log(ref.current.getSecondsLoaded(),"play")}
        onSeek={(e) => console.log(e,"seek")}
        onBuffer={(e) => console.log(e,"buffer")}
        onReady={(e) => console.log(e,"ready")}
        ref={ref}
        onDuration={(e) => console.log(e,"duration")}
        controls={true}
      />

      <button onClick={handleSkip}>Skip</button> */}

      {/* <Level2 /> */}
   <TestKonva/>
    </div>
  );
}

export default App;
