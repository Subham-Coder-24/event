// import React from "react";
// import "./ColorfulText.css";

const ColorfulText = ({ text }) => {
  const colors = [
    "#FF6347",
    "#4682B4",
    "#32CD32",
    "#FFD700",
    "#8A2BE2",
    "#FF69B4",
  ];

  const getColorForIndex = (index) => colors[index % colors.length];

  const coloredText = text.split("").map((char, index) => (
    <span key={index} style={{ color: getColorForIndex(index) }}>
      {char}
    </span>
  ));

  return <h3 className="colorful-text">{coloredText}</h3>;
};

export default ColorfulText;
