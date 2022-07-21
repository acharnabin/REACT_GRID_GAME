import React, { useEffect, useRef } from "react";
import ReactPlayer from "react-player";

const Test = () => {
  const iref = useRef(null);
  const [pausedView, setPausedView] = React.useState(false);
  const [EndedView, setEndedView] = React.useState(false);
  const [playing, setPlaying] = React.useState(false);

  const handlePause = () => {
    setPlaying(false);
    setPausedView(true);
  };

  const onPLay = () => {
    setPlaying(true);
    setPausedView(false);
  };

  const onEnd = () => {
    setPlaying(false);
    setPausedView(false);
    setEndedView(true);
  };

  return (
    <div>
      Test
      <div className="vedioContainer">
        <ReactPlayer
          config={{
            youtube: {
              playerVars: {
                showinfo: 0,
                controls: 1,
                rel: 0,
                fs: 0,
              },
            },
          }}
          url="https://www.youtube.com/embed/0DPLee1TmPo?&theme=dark&autohide=2&modestbranding=1&showinfo=0&rel=0&fs=0"
          onPause={handlePause}
          onEnded={onEnd}
          onPlay={onPLay}
          playing={playing}
          width={640}
          height={360}
          onProgress={(e) => console.log(e, "prgres")}
          // onPlay={(e) => console.log(ref.current.getSecondsLoaded(),"play")}
          onSeek={(e) => console.log(e, "seek")}
          onBuffer={(e) => console.log(e, "buffer")}
          onReady={(e) => console.log(e, "ready")}
          ref={iref}
          onDuration={(e) => console.log(e, "duration")}
          controls={true}
        />
        {pausedView && (
          <div className="paused_view">
            <button onClick={onPLay}>Play</button>
          </div>
        )}

        {EndedView && (
          <div className="ended_view">
            <button onClick={onPLay}>reload</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Test;
