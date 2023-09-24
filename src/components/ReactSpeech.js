import { useRef, useState, useEffect } from "react";
import axios from "axios";
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
  const [textInput, setTextInput] = useState("");
  const [resultText, setResultText] = useState("");
  const [textLanguageKey, setTextLanguageKey] = useState("");
  const [languagesList, setLanguagesList] = useState([]);
  const [detectLanguageKey, setdetectedLanguageKey] = useState("");
  const ref = useRef(null);
  const [buttonText, setButtonText] = useState("Copy");

  const microphoneRef = useRef(null);
  


 // get the language of text input
 const getLanguageSource = () => {
  axios
    .post(`https://libretranslate.de/detect`, {
      q: textInput,
    })
    .then((response) => {
      setdetectedLanguageKey(response.data[0].language);
      console.log(response.data[0].language);
    });
};

// translate the input text and set it in result field
const translateText = () => {
  setResultText(textInput);
  console.log(setTextInput(ref.current.value))
  getLanguageSource();

  let data = {
    q: textInput,
    source: detectLanguageKey,
    target: textLanguageKey,
  };
  axios.post(`https://libretranslate.de/translate`, data).then((response) => {
    setResultText(response.data.translatedText);
    console.log(response.data.translatedText);
  });
};

const languageKey = (selectedLanguage) => {
  setTextLanguageKey(selectedLanguage.target.value);
  console.log(selectedLanguage.target.value);
};

useEffect(() => {
  axios.get(`https://libretranslate.de/languages`).then((response) => {
    setLanguagesList(response.data);
    console.log("lang", response.data);
  });

  getLanguageSource();
}, [textInput]);

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
                      Pause
                    </button>
                  )}
                </div>
                {transcript && (
                  <>
                  <div className="flex gap-4 items-center flex-col">
                    <input
                      type="text"
                      name="text"
                      id="mytext"
                      className=" text-purple-700 px-4 py-4 text-md border-b border-purple-700  shadow-sm focus:border-b focus:outline-none"
                      value={transcript}
                      ref={ref}
                      onChange={(e) => setTextInput(e.target.value)}
                    />
                    <select
                        className="select placeholder-transparent h-10  border-b-2 bg-white border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600 "
                        onChange={languageKey}
                      >
                        {languagesList.map((language) => {
                          return (
                            <option value={language.code}>
                              {language.name}
                            </option>
                          );
                        })}
                      </select>
                      <div class="relative flex">
                        <input
                          readonly
                          autocomplete="off"
                          id="text"
                          name="text"
                          type="text"
                          class=" mt-3 peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                          value={resultText}
                        />
                        <label
                          for="text"
                          class="absolute left-0 -top-6.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                        >
                          Your translated text
                        </label>
                      </div>
                        
                    <div className="buttons flex gap-2 items-center">
                    <button
                          class="border-solid hover:shadow-lg border-purple-700 border-2 px-8 py-4 text-purple-700 hover:text-white hover:bg-purple-700 bg-white rounded-lg flex justify-center items-center transition ease-in-out duration-150 transition ease-in-out duration-200"
                          onClick={translateText}
                        >
                          Translate
                        </button>
                      <button
                        class="border-solid hover:shadow-lg border-purple-700 border-2 px-8 py-4 text-purple-700 hover:text-white hover:bg-purple-700 bg-white rounded-lg flex justify-center items-center transition ease-in-out duration-150 transition ease-in-out duration-200"
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
               
                      
                     </div>
                     <div className="">
                       <p>Want to Translate language? <a href="/" className="text-purple-700 hover:underline hover:text-purple-700 font-bold">Click here! </a> </p>
                     </div>
                  </>

                )}
              </div>
            </div>
          </div>
        </div>
        <p className="text-center pb-6">Made with 💜 by Sneha </p>
      </div>
    </>
  );
}
