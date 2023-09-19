import React, { useState, useEffect } from "react";
import { MdGTranslate } from "react-icons/md";
import { RiTranslate } from "react-icons/ri";
import { Form, TextArea, Button } from "semantic-ui-react";
import axios from "axios";

export default function Translate() {
  const [textInput, setTextInput] = useState("");
  const [resultText, setResultText] = useState("");
  const [textLanguageKey, setTextLanguageKey] = useState("");
  const [languagesList, setLanguagesList] = useState([]);
  const [detectLanguageKey, setdetectedLanguageKey] = useState("");

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
  return (
    <div className="container">
      <div className="title">
        <h2>
          {" "}
          <RiTranslate style={{ margin: "0 10px" }} />
          Multi-Language Text Translator
        </h2>
      </div>

      <div className="translator-content">
        <Form>
          <div className="select-lang">
            <select className="select" onChange={languageKey}>
              {languagesList.map((language) => {
                return <option value={language.code}>{language.name}</option>;
              })}
            </select>
          </div>
          <div className="wrapper">
            <Form.Field
              control={TextArea}
              placeholder="Type text to translate"
              onChange={(e) => setTextInput(e.target.value)}
            />
            <Form.Field
              control={TextArea}
              placeholder="Your result translation"
              value={resultText}
            />
          </div>
          <div className="btn">
            <Button primary onClick={translateText}>
              Translate
              <MdGTranslate style={{ margin: "0 10px" }} />
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}