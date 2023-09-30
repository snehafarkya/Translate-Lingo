// import React, { Component } from "react";
// import AudioAnalyser from "react-audio-analyser";

// export default class Audioo extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       status: ""
//     };
//   }

//   controlAudio(status) {
//     this.setState({
//       status
//     });
//   }

//   changeScheme(e) {
//     this.setState({
//       audioType: e.target.value
//     });
//   }

//   componentDidMount() {
//     this.setState({
//       audioType: "audio/wav"
//     });
//   }

//   render() {
//     const { status, audioSrc, audioType } = this.state;
//     const audioProps = {
//       audioType,
//       // audioOptions: {sampleRate: 30000}, // 设置输出音频采样率
//       status,
//       audioSrc,
//       timeslice: 1000, // timeslice（https://developer.mozilla.org/en-US/docs/Web/API/MediaRecorder/start#Parameters）
//       startCallback: e => {
//         console.log("succ start", e);
//       },
//       pauseCallback: e => {
//         console.log("succ pause", e);
//       },
//       stopCallback: e => {
//         this.setState({
//           audioSrc: window.URL.createObjectURL(e)
//         });
//         console.log("succ stop", e);
//       },
//       onRecordCallback: e => {
//         console.log("recording", e);
//       },
//       errorCallback: err => {
//         console.log("error", err);
//       }
//     };
//     return (
//       <div>
//         <AudioAnalyser {...audioProps} >
//           <div className="btn-box">
//             <button
//               className="btn"
//               onClick={() => this.controlAudio("recording")}
//             >
//               Start
//             </button>
//             <button className="btn" onClick={() => this.controlAudio("paused")}>
//               Pause
//             </button>
//             <button
//               className="btn"
//               onClick={() => this.controlAudio("inactive")}
//             >
//               Stop
//             </button>
//             <button className="btn" onClick={() => console.log(AudioAnalyser)}>
//               Log
//             </button>
//           </div>
//         </AudioAnalyser>
//         <p>choose output type</p>
//         <select
//           name=""
//           id=""
//           onChange={e => this.changeScheme(e)}
//           value={audioType}
//         >
//           <option value="audio/webm">audio/webm（default）</option>
//           <option value="audio/wav">audio/wav</option>
//           <option value="audio/mp3">audio/mp3</option>
//         </select>
//       </div>
//     );
//   }
// }


import React, { useState, useEffect } from "react";
import AudioAnalyser from "react-audio-analyser";

const Audioo = () => {
  const [status, setStatus] = useState("");
  const [audioType, setAudioType] = useState("audio/wav");
  const [audioSrc, setAudioSrc] = useState(null);

  const controlAudio = (newStatus) => {
    setStatus(newStatus);
  };

  const changeScheme = (e) => {
    setAudioType(e.target.value);
  };

  useEffect(() => {
    setAudioType("audio/wav");
  }, []);

  const startCallback = (e) => {
    console.log("succ start", e);
  };

  const pauseCallback = (e) => {
    console.log("succ pause", e);
  };

  const stopCallback = (e) => {
    setAudioSrc(window.URL.createObjectURL(e));
    console.log("succ stop", e);
  };

  const onRecordCallback = (e) => {
    console.log("recording", e);
  };

  const errorCallback = (err) => {
    console.log("error", err);
  };

  const audioProps = {
    audioType,
    status,
    audioSrc,
    timeslice: 1000,
    startCallback,
    pauseCallback,
    stopCallback,
    onRecordCallback,
    errorCallback,
  };

  return (
    <div>
      <AudioAnalyser {...audioProps}>
        <div className="btn-box">
          <button className="btn" onClick={() => controlAudio("recording")}>
            Start
          </button>
          <button className="btn" onClick={() => controlAudio("paused")}>
            Pause
          </button>
          <button className="btn" onClick={() => controlAudio("inactive")}>
            Stop
          </button>
          <button className="btn" onClick={() => console.log(AudioAnalyser)}>
            Log
          </button>
        </div>
      </AudioAnalyser>
      <p>choose output type</p>
      <select name="" id="" onChange={changeScheme} value={audioType}>
        <option value="audio/webm">audio/webm（default）</option>
        <option value="audio/wav">audio/wav</option>
        <option value="audio/mp3">audio/mp3</option>
      </select>
    </div>
  );
};

export default Audioo;
