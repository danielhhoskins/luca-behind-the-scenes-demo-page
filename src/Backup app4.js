import React from 'react';
import testAnalysis from './sample_analysis.json';
import './App.css';

function Header() {
   return (
     <div style={{
       width: '100%',
       height: '80px',
       backgroundColor: '#406353',
       color: 'white',
       display: 'flex',
       alignItems: 'center',
       justifyContent: 'center',
       position: 'relative',
       marginBottom: '30px'
     }}>
       <div style={{
         position: 'absolute', 
         bottom: '10px',
         left: '50px',
         fontSize: '24px', // Larger font size
         fontWeight: 'bold', // Bold text
         fontFamily: 'Arial, sans-serif', // Optional: Change the font family
       }}>
         Automatic Phoneme Recognition
       </div>
     </div>
   );
 }
 
 function App() {
   const storyWords = testAnalysis.storyWords;
   const analyses = testAnalysis.analyses;
 
   return (
     <div className="App" style={{backgroundColor: '#6f9e86', paddingBottom: '10px'}}>
       <Header />
       {storyWords.map((sentenceWords, sentenceIndex) => (
         <Sentence key={sentenceIndex} words={sentenceWords} analysis={analyses[sentenceIndex]} />
       ))}
     </div>
   );
 }

function Sentence({words, analysis}) {
   const wordSubsections = [];
   let currentWordIndex = 0;
   let currentWordSubsection = [];
 
   for (let i = 0; i < analysis.length; i++) {
     const {wordIndex, referencePhoneme, transcribedPhoneme, error} = analysis[i];
     if (wordIndex !== currentWordIndex) {
       wordSubsections.push(
         <WordSubsection key={currentWordIndex} word={words[currentWordIndex]} phonemes={currentWordSubsection} />
       );
       currentWordSubsection = [];
       currentWordIndex = wordIndex;
     }
     currentWordSubsection.push({referencePhoneme, transcribedPhoneme, error});
   }
   wordSubsections.push(
     <WordSubsection key={currentWordIndex} word={words[currentWordIndex]} phonemes={currentWordSubsection} />
   );
 
   const wrappedWordSubsections = [];
   let currentLine = [<Labels key="labels" />]; // Initialize the first line with Labels
   for (let i = 0; i < wordSubsections.length; i++) {
     currentLine.push(wordSubsections[i]);
     if (i < wordSubsections.length - 1 && (i + 1) % 5 === 0) {
       wrappedWordSubsections.push(<div key={i} style={{display: 'flex', marginBottom: '20px'}}>{currentLine}</div>);
       currentLine = [<Labels key={`labels-${i + 1}`} />]; // Start each new line with Labels
     }
   }
   if (currentLine.length > 0) {
     wrappedWordSubsections.push(<div key={wordSubsections.length} style={{display: 'flex', marginBottom: '20px'}}>{currentLine}</div>);
   }
 
   return (
     <div style={{ marginLeft: '30px', marginBottom: '60px'}}>
       {wrappedWordSubsections.map((line, index) => (
         <div key={index}>
           {line}
         </div>
       ))}
     </div>
   );
 }

 function Labels() {
   return (
     <div style={{
       display: 'flex', 
       flexDirection: 'column', 
       alignItems: 'left', 
       justifyContent: 'flex-end'  // This will align children at the bottom
     }}>
      <div style={{marginBottom: '5px', color: 'white', width: '50px', height: '18px', padding: '5px', fontSize: '11px'}}>GROUND TRUTH</div>
      <div style={{color: 'white', width: '50px', height: '18px', padding: '5px', fontSize: '11px'}}>USER INPUT</div>
     </div>
   );
 }

function WordSubsection({word, phonemes}) {
  return (
    <div style={{marginRight: '70px', marginBottom: '20px'}}>
      <div style={{backgroundColor: 'white', padding: '5px', borderRadius: '5px', width: '100px', textAlign: 'center', marginBottom: '10px'}}>{word.toUpperCase()}</div>
      <GroundTruthPhonemes phonemes={phonemes} />
      <UserInputPhonemes phonemes={phonemes} />
    </div>
  );
}

function GroundTruthPhonemes({phonemes}) {
  return (
    <div style={{display: 'flex', marginBottom: '5px'}}>
      {phonemes.map(({referencePhoneme}, index) => (
        <div key={index} style={{backgroundColor: '#406353', color: 'white', padding: '5px', marginRight: '5px', width: '20px', textAlign: 'center'}}>{referencePhoneme.toUpperCase()}</div>
      ))}
    </div>
  );
}

function UserInputPhonemes({phonemes}) {
  return (
    <div style={{display: 'flex'}}>
      {phonemes.map(({transcribedPhoneme, error}, index) => {
        const backgroundColor = error === 'None' ? 'white' : '#F05C4F';
        const color = error === 'None' ? '#406353' : 'white';
        return (
          <div key={index} style={{backgroundColor, color, padding: '5px', marginRight: '5px', width: '20px', textAlign: 'center'}}>{transcribedPhoneme.toUpperCase()}</div>
        );
      })}
    </div>
  );
}

export default App;