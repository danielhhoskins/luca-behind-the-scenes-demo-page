import React from 'react';

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
       >
          <div
             style={{
                position: "absolute",
                bottom: "10px",
                left: "50px",
                fontSize: "24px", // Larger font size
                fontWeight: "bold", // Bold text
                fontFamily: "Arial, sans-serif" // Optional: Change the font family
             }}
          >
             Automatic Phoneme Recognition
          </div>
       </div>
    );
 }

export default Header;