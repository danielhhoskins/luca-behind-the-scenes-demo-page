import React from 'react';
import './App.css';
import testAnalysis from './test_analysis.json';

function App() {
  const { storyWords, analyses } = testAnalysis;

  return (
    <div style={{ backgroundColor: '#6f9e86', padding: '20px' }}>
      {storyWords.map((sentence, sentenceIndex) => (
        <div key={sentenceIndex} style={{ marginBottom: '40px' }}>
          {sentence.map((word, wordIndex) => {
            const wordAnalyses = analyses[sentenceIndex].filter(
              (analysis) => analysis.wordIndex === wordIndex
            );
            const groundTruthPhonemes = wordAnalyses.map(
              (analysis) => analysis.referencePhoneme
            );
            const userInputPhonemes = wordAnalyses.map(
              (analysis) => analysis.transcribedPhoneme
            );

            return (
              <div
                key={wordIndex}
                style={{
                  display: 'inline-block',
                  marginRight: '10px',
                  marginBottom: '20px',
                  verticalAlign: 'top',
                }}
              >
                <div
                  style={{
                    backgroundColor: 'white',
                    padding: '5px 10px',
                    borderRadius: '5px',
                    marginBottom: '10px',
                    width: '100px',
                    textAlign: 'center',
                  }}
                >
                  {word}
                </div>
                <div>
                  <span style={{ marginRight: '10px' }}>Ground Truth:</span>
                  {groundTruthPhonemes.map((phoneme, phonemeIndex) => (
                    <div
                      key={phonemeIndex}
                      style={{
                        display: 'inline-block',
                        backgroundColor: '#406353',
                        color: 'white',
                        padding: '5px',
                        marginRight: '5px',
                        marginBottom: '5px',
                      }}
                    >
                      {phoneme}
                    </div>
                  ))}
                </div>
                <div>
                  <span style={{ marginRight: '10px' }}>User Input:</span>
                  {userInputPhonemes.map((phoneme, phonemeIndex) => (
                    <div
                      key={phonemeIndex}
                      style={{
                        display: 'inline-block',
                        backgroundColor: 'white',
                        color: '#406353',
                        padding: '5px',
                        marginRight: '5px',
                        marginBottom: '5px',
                      }}
                    >
                      {phoneme}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}

export default App;