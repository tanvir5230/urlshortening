import React from "react";
const Divider = () => {
  return (
    <div
      style={{
        width: "100%",
        height: "50px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <HorizontalLine />
      <CircleOfDivider />
      <HorizontalLine />
    </div>
  );
};

const HorizontalLine = () => {
  return (
    <div
      style={{
        width: "40%",
        border: "1px solid white",
        borderRadius: "10px",
      }}
    ></div>
  );
};

const CircleOfDivider = () => {
  return (
    <div
      style={{
        backgroundColor: "white",
        width: "20px",
        height: "20px",
        borderRadius: "100%",
        margin: "0 20px",
      }}
    ></div>
  );
};

export default Divider;
