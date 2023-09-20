import React, { useState, useEffect } from "react";
import { AiOutlineCopy} from "react-icons/ai";
import { TiTickOutline} from "react-icons/ti";

import { RiArrowRightCircleFill, RiCopyleftFill, RiLoopRightLine, RiTranslate } from "react-icons/ri";
import image from './digital-translator-abstract-concept-illustration_335657-3769.avif'
import { Form, TextArea, Button } from "semantic-ui-react";
import axios from "axios";

export default function Translate() {
  const [textInput, setTextInput] = useState("");
  const [resultText, setResultText] = useState("");
  const [textLanguageKey, setTextLanguageKey] = useState("");
  const [languagesList, setLanguagesList] = useState([]);
  const [detectLanguageKey, setdetectedLanguageKey] = useState("");
  setTimeout(function(){
    var spin = document.getElementById('spin').style.display = "none"
    var cont = document.getElementById('cont').style.display = "block"

  }, 4000)
  // get the language of text input
  const getLanguageSource = () => {
    axios
      .post(`https://libretranslate.de/detect`, {
        q: textInput,
      })
      .then((response) => {
        setdetectedLanguageKey(response.data[0].language);
        console.log(response.data[0].language)
      });
  };

  // translate the input text and set it in result field
  const translateText = () => {
    setResultText(textInput);

    getLanguageSource();

    let data = {
      q: textInput,
      source: detectLanguageKey,
      target: textLanguageKey,
    };
    axios.post(`https://libretranslate.de/translate`, data).then((response) => {
      setResultText(response.data.translatedText);
      console.log(response.data.translatedText)
    });
  };

  const languageKey = (selectedLanguage) => {
    setTextLanguageKey(selectedLanguage.target.value);
    console.log(selectedLanguage.target.value)
  };

  useEffect(() => {
    axios.get(`https://libretranslate.de/languages`).then((response) => {
      setLanguagesList(response.data);
      console.log("lang", response.data)
    });

    getLanguageSource();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [textInput]);

// copy text of resultant field
  const copy = () => {
    var mytext = document.getElementById('text').value;

    if(mytext){ navigator.clipboard.writeText(mytext);
    // alert("Text copied");
    var file = document.getElementById('file').style.display = "none";
    var right = document.getElementById('right').style.display = "block";
    }
    else {
      alert("Nothing to copy!")
    }
  }
  return (
     <>
<div className="h-screen loader " id="spin">
</div>
<div className="">
    <div className="hidden h-screen" id="cont" style={{display:"none"}}>
      <div className="md:flex md:h-screen  md:justify-between  grid grid-cols-1 mt-12 md:mt-0  md:flex-row md:items-center md:mx-44 mx-6">
        <div className="md:order-2">
        <img src={image} alt="Image here" className="w-[400px] md:w-auto"/>
        </div>
      <div className="md:order-1 md:w-1/2">
      <div className="title text-left leading-[24px]">
        <h1 className="md:text-6xl text-[30px]">
          {" "}
          <span>
          <RiTranslate style={{ margin: "0 10px" }} /></span>
          Welcome to your Friendly <span className="text-purple-700">TranslateLingo:</span> Seamlessly Connect the World.
        </h1>
        <p className="font-medium text-xl">Unlock a World of Possibilities with Effortless Language Translation – Connect, Communicate, and Cultivate Global Relationships Like Never Before!</p>
        <a href="#formm">
        <button className="bg-purple-700 text-white px-12 py-4 rounded-md hover:trasition hover:bg-purple-500 hover:duration-200">Start here</button></a>
      </div>

      
      </div>
      </div>

      {/* form */}
      {/* <div className="translator-content md:w-[30%] w-[80%] mx-auto mb-40 mt-40 md:mt-0" id="formm">
        <Form >
          <div className="select-lang mb-6 border-solid border-purple-700 border rounded-md">
            <select className="select rounded-xl border border-solid border-purple-700" onChange={languageKey}>
              {languagesList.map((language) => {
                return <option value={language.code}>{language.name}</option>;
              })}
            </select>
          </div>
          <div className="wrapper flex gap-3 flex-col">
            <Form.Field
              control={TextArea}
              placeholder="Type text to translate"
              className="border-purple-700 border-solid rounded-md border"
              onChange={(e) => setTextInput(e.target.value)}
            />
            <Form.Field
              control={TextArea}
              placeholder="Your result translation"
              value={resultText}
              className="border-purple-700 border-solid rounded-md border "
            />
          </div>
          <div className="btn mt-6 ">
            <button className="bg-purple-700 text-white px-8 py-4 hover:bg-purple-600 flex gap-1 justify-center items-center rounded-lg" onClick={translateText}>
              Translate
              <MdGTranslate style={{ margin: "0 10px" }} />
            </button>
          </div>
        </Form>
      </div> */}
      <div class="min-h-full  py-6 flex flex-col justify-center sm:py-12  " id="formm">
	<div class="relative py-3 sm:max-w-xl mx-auto  w-[80%] rounded-xl">
		<div
			class="absolute inset-0 bg-gradient-to-r from-purple-300 to-purple-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 rounded-3xl">
		</div>
		<div class="relative px-4 py-10 bg-white shadow-lg rounded-3xl sm:p-20">
			<div class="max-w-md mx-auto">
				<div>
					<h1 class="text-2xl font-semibold">Go first with TranslateLingo 💜</h1>
				</div>
				<div class="divide-y divide-gray-200">
					<div class="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
						<div class="relative">
							<input autocomplete="off" id="email" name="email" type="text" class="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" onChange={(e) => setTextInput(e.target.value)} />
							<label for="email" class="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Type text to translate</label>
						</div>

            <select className="select placeholder-transparent h-10 w-full border-b-2 bg-white border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600 " onChange={languageKey}>
              {languagesList.map((language) => {
                return <option value={language.code}>{language.name}</option>;
              })}
            </select>
						<div class="relative flex">
							<input readonly autocomplete="off" id="text" name="text" type="text" class=" mt-3 peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" value={resultText}/>
              <label for="text" class="absolute left-0 -top-6.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm" >Your translated text</label>
            </div>
						<div class="relative flex gap-2">
							<button class="bg-purple-700 text-white px-8 py-4 hover:bg-purple-600 flex gap-1 justify-center items-center rounded-lg" onClick={translateText}>Translate</button>
              <button onClick={copy} className="border-solid border-purple-700 bg-white rounded-lg "> <AiOutlineCopy id="file" /> Copy <TiTickOutline id="right" className="hidden"/> </button>

						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
<p className="text-center pb-6">Made with 💜 by Sneha  </p>

      </div>
    </div>
    </> 
  );
}