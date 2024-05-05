import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";

function HomePage() {
   const navigate = useNavigate();

   const handleClick = () => {
      navigate("/analysis");
   };

   return (
      <div style={{ backgroundColor: "#6f9e86", paddingBottom: "10px", height: "100vh" }}>
         <Header />
         <div
            style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "calc(100vh - 110px)" }}
         >
            <button
               onClick={handleClick}
               style={{
                  padding: "10px 20px",
                  fontSize: "18px",
                  backgroundColor: "white",
                  color: "#406353",
                  borderRadius: "10px",
                  border: "none"
               }}
            >
               SHOW ANALYSIS
            </button>
         </div>
      </div>
   );
}

export default HomePage;
