import { useRef, useState } from "react";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import { TiMicrophone, TiTickOutline } from "react-icons/ti";
import { AiOutlineClear } from "react-icons/ai";
import { AiOutlineCopy } from "react-icons/ai";
import { RiMoonClearFill } from "react-icons/ri";
export default function ReactSpeech() {
  const { transcript, resetTranscript } = useSpeechRecognition();
  const [isListening, setIsListening] = useState(false);
  const [buttonText, setButtonText] = useState("Copy");

  const microphoneRef = useRef(null);
  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return (
      <div className="mircophone-container">
        Browser is not Support Speech Recognition.
      </div>
    );
  }
  const handleListing = () => {
    setIsListening(true);
    microphoneRef.current.classList.add("listening");
    SpeechRecognition.startListening({
      continuous: true,
    });
  };
  const stopHandle = () => {
    setIsListening(false);
    microphoneRef.current.classList.remove("listening");
    SpeechRecognition.stopListening();
  };
  const handleReset = () => {
    stopHandle();
    resetTranscript();
  };

  const copy = () => {
    var mytext = document.getElementById("text").value;

    if (mytext) {
      navigator.clipboard.writeText(mytext);
      // alert("Text copied");
      var file = (document.getElementById("file").style.display = "none");
      var right = (document.getElementById("right").style.display = "block");
      setButtonText("Copied");
    setTimeout(function(){
      var file = (document.getElementById("file").style.display = "block");
      var right = (document.getElementById("right").style.display = "none");
      setButtonText("Copy")
    }, 1000);

      // var clickMe = document.getElementById('clickMe').style.background = "green";
    } else {
      alert("Nothing to copy!");
    }
  };
  return (
    <div className="microphone-wrapper">
      <div className="mircophone-container flex gap-2 items-center">
        <div
          className="flex gap-2 items-center"
          ref={microphoneRef}
          onClick={handleListing}
        >
          {/* <img src={microPhoneIcon} className="microphone-icon" /> */}
          <TiMicrophone className="text-purple-700"/>
        </div>
        <div className="text-purple-700 cursor-pointer" onClick={handleListing} >
          {isListening ? "Listening........." : "Click to start Listening"}
        </div>
        {isListening && (
          <button className="microphone-stop btn text-purple-700" onClick={stopHandle}>
            Stop
          </button>
        )}
      </div>
      {transcript && (
        <div className="flex gap-2 items-center flex-col">
          {/* <div className="microphone-result-text">{transcript}</div> */}
          <input type="text" name="text" id="text" className=" text-purple-700 px-4 py-4 text-md border-b border-purple-700  shadow-sm " value={transcript} />
          <div className="buttons flex gap-2 items-center">
          <button class="bg-purple-700 text-white px-8 py-4 hover:shadow-lg hover:bg-white hover:text-purple-700 border-transparent border-2 hover:border-purple-700 flex gap-1 justify-center items-center rounded-lg" onClick={handleReset}>

            Reset 
          </button>
          <button
            onClick={copy}
            id="clickMe"
            className="border-solid hover:shadow-lg border-purple-700 border-2 px-8 py-4 text-purple-700 hover:text-white hover:bg-purple-700 bg-white rounded-lg flex justify-center items-center"
          >
          {" "}{buttonText}
            <AiOutlineCopy id="file" /> {" "}
            <TiTickOutline id="right" className="hidden" />{" "}
          </button>
          </div>
        </div>
      )}
    </div>
  );
}