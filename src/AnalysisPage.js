import React from "react";
import testAnalysis from "./analysis_space.json";
// import testAnalysis from "./analysis_candy.json";
import "./App.css";


function Header() {
   return (
      <div
         style={{
            width: "100%",
            height: "80px",
            backgroundColor: "#406353",
            color: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            marginBottom: "30px"
         }}
      ><div>
            <div
               style={{
                  position: "absolute",
                  bottom: "15px",
                  left: "50px",
                  fontSize: "24px",
                  fontWeight: "bold",
                  fontFamily: "Arial, sans-serif"
               }}
            >
               Automatic Phoneme Recognition
            </div>
            <div style={{ position: "absolute", left: "500px", bottom: "15px" }}>  
            <Legend />
            </div>
         </div>
         
      </div>
   );
}


function AnalysisPage() {
   const storyWords = testAnalysis.storyWords;
   const analyses = testAnalysis.analyses;

   return (
      <div className="App" style={{ backgroundColor: "#6f9e86", paddingBottom: "10px" }}>
         <Header />
         {storyWords.map((sentenceWords, sentenceIndex) => (
            <Sentence key={sentenceIndex} words={sentenceWords} analysis={analyses[sentenceIndex]} />
         ))}
      </div>
   );
}

function Sentence({ words, analysis }) {
   const wordSubsections = [];
   let currentWordIndex = 0;
   let currentWordSubsection = [];

   for (let i = 0; i < analysis.length; i++) {
      const { wordIndex, referencePhoneme, transcribedPhoneme, error } = analysis[i];
      if (wordIndex !== currentWordIndex) {
         wordSubsections.push(
            <WordSubsection key={currentWordIndex} word={words[currentWordIndex]} phonemes={currentWordSubsection} />
         );
         currentWordSubsection = [];
         currentWordIndex = wordIndex;
      }
      currentWordSubsection.push({ referencePhoneme, transcribedPhoneme, error });
   }
   wordSubsections.push(
      <WordSubsection key={currentWordIndex} word={words[currentWordIndex]} phonemes={currentWordSubsection} />
   );

   const wrappedWordSubsections = [];
   let currentLine = [<Labels key="labels" />]; // Initialize the first line with Labels
   for (let i = 0; i < wordSubsections.length; i++) {
      currentLine.push(wordSubsections[i]);
      if (i < wordSubsections.length - 1 && (i + 1) % 5 === 0) {
         wrappedWordSubsections.push(
            <div key={i} style={{ display: "flex", marginBottom: "20px" }}>
               {currentLine}
            </div>
         );
         currentLine = [<Labels key={`labels-${i + 1}`} />]; // Start each new line with Labels
      }
   }
   if (currentLine.length > 0) {
      wrappedWordSubsections.push(
         <div key={wordSubsections.length} style={{ display: "flex", marginBottom: "20px" }}>
            {currentLine}
         </div>
      );
   }

   return (
      <div style={{ marginLeft: "30px", marginBottom: "70px" }}>
         {wrappedWordSubsections.map((line, index) => (
            <div key={index}>{line}</div>
         ))}
      </div>
   );
}

function Labels() {
   return (
      <div
         style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "left",
            justifyContent: "flex-end" // This will align children at the bottom
         }}
      >
         <div
            style={{
               marginBottom: "5px",
               color: "white",
               width: "50px",
               height: "18px",
               padding: "5px",
               fontSize: "11px"
            }}
         >
            GROUND TRUTH
         </div>
         <div
            style={{
               color: "white",
               width: "50px",
               height: "18px",
               padding: "5px",
               fontSize: "11px",
               marginBottom: "23px"
            }}
         >
            USER INPUT
         </div>
      </div>
   );
}

function WordSubsection({ word, phonemes }) {
   return (
      <div style={{ marginRight: "70px", marginBottom: "20px" }}>
         <div
            style={{
               backgroundColor: "white",
               padding: "5px",
               borderRadius: "5px",
               width: "100px",
               textAlign: "center",
               marginBottom: "10px"
            }}
         >
            {word.toUpperCase()}
         </div>
         <GroundTruthPhonemes phonemes={phonemes} />
         <UserInputPhonemes phonemes={phonemes} />
      </div>
   );
}

function GroundTruthPhonemes({ phonemes }) {
   return (
      <div style={{ display: "flex", marginBottom: "5px" }}>
         {phonemes.map(({ referencePhoneme }, index) => (
            <div
               key={index}
               style={{
                  backgroundColor: "#406353",
                  color: "white",
                  padding: "5px",
                  marginRight: "5px",
                  width: "20px",
                  textAlign: "center"
               }}
            >
               {referencePhoneme.toUpperCase()}
            </div>
         ))}
      </div>
   );
}

function UserInputPhonemes({ phonemes }) {
   return (
      <div style={{ display: "flex" }}>
         {phonemes.map(({ transcribedPhoneme, error }, index) => {
            let backgroundColor;
            let color = "#406353"; // default text color
            let displayText = transcribedPhoneme.toUpperCase(); // default display text

            switch (error) {
               case "None":
                  backgroundColor = "white";
                  color = "#406353";
                  break;
               case "Del":
                  backgroundColor = "#F05C50"; // Red for deletion errors
                  color = "white";
                  displayText = " "; // Display blank space for deletion errors
                  break;
               case "Ins":
                  backgroundColor = "#faea36"; // Yellow for insertion errors
                  color = "#406353";
                  break;
               case "Sub":
                  backgroundColor = "#F99246"; // Orange for substitution errors
                  color = "white";
                  break;
               default:
                  backgroundColor = "white"; // Default background color
                  color = "#406353";
                  break;
            }

            return (
               <div
                  key={index}
                  style={{
                     backgroundColor,
                     color,
                     padding: "5px",
                     marginRight: "5px",
                     width: "20px",
                     height: "18px", // Set height to 30px
                     textAlign: "center"
                  }}
               >
                  {displayText}
               </div>
            );
         })}
      </div>
   );
}

function Legend() {
   return (
      <div style={{ display: "flex", alignItems: "center" }}>
         <div style={{ marginRight: "7px" }}>
            <div style={{ width: "24px", height: "24px", backgroundColor: "#F05C4F" }}></div>
         </div>
         <div style={{ marginRight: "25px" }}><strong>Deletion</strong></div>
         <div style={{ marginRight: "7px" }}>
            <div style={{ width: "24px", height: "24px", backgroundColor: "yellow" }}></div>
         </div>
         <div style={{ marginRight: "25px" }}><strong>Insertion</strong></div>
         <div style={{ marginRight: "7px" }}>
            <div style={{ width: "24px", height: "24px", backgroundColor: "#F99246" }}></div>
         </div>
         <div><strong>Substitution</strong></div>
      </div>
   )
}

export default AnalysisPage;
