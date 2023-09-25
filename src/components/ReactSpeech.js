import { useRef, useState } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { TiMicrophone, TiTickOutline } from "react-icons/ti";
import { AiOutlineClear } from "react-icons/ai";
import { AiOutlineCopy } from "react-icons/ai";
import { RiMoonClearFill } from "react-icons/ri";
import Navbar from "./Navbar";
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
      setTimeout(function () {
        var file = (document.getElementById("file").style.display = "block");
        var right = (document.getElementById("right").style.display = "none");
        setButtonText("Copy");
      }, 1000);

      // var clickMe = document.getElementById('clickMe').style.background = "green";
    } else {
      alert("Nothing to copy!");
    }
  };
  return (
    <>
      <div className="h-screen w-screen">
        <Navbar />
        <div
          class="min-h-full  py-6 flex flex-col justify-center sm:py-12  "
          id="formm"
        >
          <div class="relative py-3 sm:max-w-xl mx-auto  rounded-xl">
            <div class="absolute inset-0 bg-gradient-to-r from-purple-300 to-purple-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 rounded-3xl"></div>
            <div class="relative px-4 py-10 bg-white shadow-lg rounded-3xl sm:p-20">
              <div class="max-w-md mx-auto flex flex-col gap-4">
              <div>
                    <h1 class="text-2xl font-semibold">
                      Go first with TranslateLingo 💜
                    </h1>
                  </div>
                <div className=" flex gap-2 items-center justify-center">
                  <div
                    className="flex gap-2 items-center justify-center"
                    ref={microphoneRef}
                    onClick={handleListing}
                  >
                    {/* <img src={microPhoneIcon} className="microphone-icon" /> */}
                    <TiMicrophone className="text-purple-700 font-bold cursor-pointer" />
                  </div>
                  <div
                    className="text-purple-700 cursor-pointer font-bold transition  hover:scale-[1.02]" 
                    onClick={handleListing}
                  >
                    {isListening
                      ? "Listening........."
                      : "Click to say something"}
                  </div>
                  {isListening && (
                    <button
                      className=" border-solid hover:shadow-lg border-transparent font-semibold hover:border-purple-700 border-2 px-8 py-4 text-purple-700 hover:text-white hover:bg-purple-700 bg-white rounded-lg flex justify-center items-center transition ease-in-out duration-200" 
                      onClick={stopHandle}
                    >
                      Stop
                    </button>
                  )}
                </div>
                {transcript && (
                  <div className="flex gap-4 items-center flex-col">
                    <input
                      type="text"
                      name="text"
                      id="text"
                      className=" text-purple-700 px-4 py-4 text-md border-b border-purple-700  shadow-sm focus:border-b focus:outline-none"
                      value={transcript}
                    />
                    <div className="buttons flex gap-2 items-center">
                      <button
                        class="bg-purple-700 text-white px-8 py-4 hover:shadow-lg hover:bg-white hover:text-purple-700 border-transparent border-2 hover:border-purple-700 flex gap-1 justify-center items-center rounded-lg transition ease-in-out duration-200"
                        onClick={handleReset}
                      >
                        Reset
                      </button>
                      <button
                        onClick={copy}
                        id="clickMe"
                        className="border-solid hover:shadow-lg border-purple-700 border-2 px-8 py-4 text-purple-700 hover:text-white hover:bg-purple-700 bg-white rounded-lg flex justify-center items-center transition ease-in-out duration-150 transition ease-in-out duration-200"
                      >
                        {" "}
                        {buttonText}
                        <AiOutlineCopy id="file" />{" "}
                        <TiTickOutline id="right" className="hidden" />{" "}
                      </button>
                    </div>
                    <div className="">
                        <p>Want to Translate Language? <a href="/" className="text-purple-700 hover:underline hover:text-purple-700 font-bold">Click here! </a> </p>
                      </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
