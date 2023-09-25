import React from "react";
import { useSpeechSynthesis } from "react-speech-kit";
import Navbar from "./Navbar";
import { RiSpeakFill } from "react-icons/ri";
const Speech = () => {
	const [value, setValue] = React.useState("");
	const { speak } = useSpeechSynthesis();
  
  const click = ()=>{
    if(!value){
      speak({ text: "Nothing to speak" })
    }
    else{
      speak({ text: value })
    }
  }
	return (
    <div className="h-screen w-screen flex flex-col  ">
      <Navbar />

		<div className="speech flex my-auto">
    <div class="relative py-3 sm:max-w-xl mx-auto  rounded-xl">
            <div class="absolute inset-0 bg-gradient-to-r from-purple-300 to-purple-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 rounded-3xl"></div>
            <div class="relative px-4 py-10 bg-white shadow-lg rounded-3xl sm:p-20">
              <div class="max-w-md mx-auto flex flex-col gap-4">
              <div>
                    <h1 class="text-2xl font-semibold">
                      Go first with TranslateLingo 💜
                    </h1>
                  </div>
			<div className="group">
				<h2>Convert text to speech</h2>
			</div>
			<div className="group">
				<textarea
					rows="8"
          className="w-full border-2 rounded-xl border-purple-300 hover:border-purple-700 focus:outline-none focus:ring-0 p-4 hover:shadow-md transition duration-200"
					value={value}
          id="text"
					onChange={(e) => setValue(e.target.value)}
				></textarea>
			</div>
			<div className="group flex justify-center">
				<button 
          class="transition ease-in-out duration-200 bg-purple-700 text-white px-8 py-4 hover:shadow-lg hover:bg-white hover:text-purple-700 border-transparent border-2 hover:border-purple-700 flex gap-1 justify-center items-center rounded-lg"
          onClick={click }>
					Listen <RiSpeakFill/>
				</button>
			</div>
      </div>
      </div>
      </div>
		</div>
    </div>

	);
};
export default Speech;
