import React, { useState, useEffect } from "react";
import { AiOutlineCopy } from "react-icons/ai";
import { TiTickOutline } from "react-icons/ti";
import logo from './logo.png'
import {
  RiArrowDownCircleLine,
  RiArrowDownLine,
  RiTranslate,
} from "react-icons/ri";
import image from "./image-removebg-preview (6).png";
import axios from "axios";
import Navbar from "./components/Navbar";
import { Link } from "react-router-dom";
export default function Translate() {
  const [textInput, setTextInput] = useState("");
  const [resultText, setResultText] = useState("");
  const [textLanguageKey, setTextLanguageKey] = useState("");
  const [languagesList, setLanguagesList] = useState([]);
  const [detectLanguageKey, setdetectedLanguageKey] = useState("");
  const [buttonText, setButtonText] = useState("Copy");
  setTimeout(function () {
    var spin = (document.getElementById("spin").style.display = "none");
    var cont = (document.getElementById("cont").style.display = "block");
  }, 3000);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [textInput]);

  // copy text of resultant field
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
      <div className="h-screen loader bg-transparent" id="spin"></div>
      <div className="">
        <div className="hidden  bg-white  h-screen" id="cont" style={{ display: "none" }}>
          {/* <a href="https://Translate-lingo.authui.site/">Sign In</a> */}
          <Navbar/>
          <div className="md:flex md:justify-between  grid grid-cols-1 mt-12 md:mt-4  md:flex-row md:items-center md:mx-44 mx-6">
            <div className="md:order-2">
              <img
                src={image}
                alt="Image here"
                className="w-[400px] md:w-[600px] "
              />
            </div>
            <div className="md:order-1 md:w-1/2">
              <div className="title text-left leading-[24px]">
                <h1 className="md:text-6xl text-[30px]">
                  {" "}
                  <span>
                    <RiTranslate style={{ margin: "0 10px" }} />
                  </span>
                  Welcome to your Friendly{" "}
                  <span className="text-purple-700">TranslateLingo:</span>{" "}
                  Seamlessly Connect the World.
                </h1>
                <p className="font-medium text-xl">
                  Unlock a World of Possibilities with Effortless Language
                  Translation – Connect, Communicate, and Cultivate Global
                  Relationships Like Never Before!
                </p>
                <a href="#formm">
                  <button className="group bg-purple-700 text-white px-8 py-4 hover:shadow-lg hover:bg-white hover:text-purple-700 border-transparent border-2 hover:border-purple-700 flex gap-1 justify-center items-center rounded-lg transition ease-in-out duration-200" >
                    Get Started <RiArrowDownLine className="relative group-hover:top-1 transition ease-in-out duration-150 group-hover:font-bold"/>
                  </button>
                </a>
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
          <div className="section relative mt-10 flex md:flex-row flex-col items-center justify-between md:h-screen ">
            {/* <img src="https://www.statnews.com/wp-content/uploads/2018/11/brain-signals-1000px-645x563.gif" alt="" className="rounded-full hover:border-purple-700 h-[400px] w-[400px] hover:border-8 transition ease-in-out duration-200 border-2 border-transparent border-solid" /> */}
            {/* <img src="https://i.pinimg.com/1200x/d0/3f/e6/d03fe65c389e72b87473f1a4243b75f0.jpg" alt="" /> */}
            <div className="section-bg md:h-full md:w-[50%] flex flex-col justify-center items-center py-auto md:px-28 px-6 h-[600px]">
              <h2 className="pt-12 text-white md:text-5xl text-3xl">Connecting <span className="text-purple-300 uppercase">Globe</span>  by eliminating Language barrier...</h2>
              <p className="md:text-2xl text-lg text-white text-center mt-4">Welcome to <span className="text-purple-300 uppercase">TranslateLingo</span> where you can:</p>
              <ol className="md:text-xl text-sm text-white list-decimal text-left pl-4 leading-[48px] ">
                <li className="md:my-2">Translate any sentence to 30+ different languages</li>
                <li className="md:my-2">Say something and it will write for you. Go <a href="/speech-to-text" className="text-purple-300 hover:text-purple-600">here</a>  </li>
                <li className="md:my-2">Write anything and your AI assistant will read it for you. Try it  <a href="/text-to-speech" className="text-purple-300 hover:text-purple-600">here</a> </li>

              </ol>
          <p className="text-center absolute bottom-6 text-white">Made with 💜 by Sneha </p>

            </div>
          <div
            class="min-h-full py-24 flex flex-col justify-center sm:py-12  "
            id="formm"
          >
            <div class="relative py-3 sm:max-w-xl md:mr-44 rounded-xl">
              <div class="absolute inset-0 bg-gradient-to-r from-purple-300 to-purple-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 rounded-3xl"></div>
              <div class="relative px-4 py-10 bg-white shadow-lg rounded-3xl sm:p-20">
                <div class="max-w-md mx-auto">
                  <div>
                    <h1 class="text-2xl font-semibold">
                      Go first with TranslateLingo 💜
                    </h1>
                  </div>
                  <div class="divide-y divide-gray-200">
                    <div class="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                      <div class="relative">
                        <input
                          autocomplete="off"
                          id="email"
                          name="email"
                          type="text"
                          class="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                          onChange={(e) => setTextInput(e.target.value)}
                        />
                        <label
                          for="email"
                          class="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                        >
                          Type text to translate
                        </label>
                      </div>

                      <select
                        className="select placeholder-transparent h-10 w-full border-b-2 bg-white border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600 "
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
                          class="absolute left-0 -top-1 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 transition-all  peer-focus:text-gray-600 peer-focus:text-sm"
                        >
                          Your translated text
                        </label>
                      </div>
                      <div class="relative flex gap-2">
                        <button
                          class="transition ease-in-out duration-200 bg-purple-700 text-white px-8 py-4 hover:shadow-lg hover:bg-white hover:text-purple-700 border-transparent border-2 hover:border-purple-700 flex gap-1 justify-center items-center rounded-lg"
                          onClick={translateText}
                        >
                          Translate <RiTranslate/>
                        </button>
                        <button
                          onClick={copy}
                          id="clickMe"
                          className=" gap-1 transition ease-in-out duration-200 border-solid hover:shadow-lg border-purple-700 border-2 px-8 py-4 text-purple-700 hover:text-white hover:bg-purple-700 bg-white rounded-lg flex justify-center items-center"
                        >
                          {" "}{buttonText}
                          <AiOutlineCopy id="file" /> {" "}
                          <TiTickOutline id="right" className="hidden" />{" "}
                        </button>
                      </div>
                      <div className="">
                        <p>Want to record and let AI type? <a href="/speech-to-text" className="text-purple-700 hover:underline hover:text-purple-700 font-bold">Click here! </a> </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          </div>
        </div>
      </div>
    </>
  );
}
