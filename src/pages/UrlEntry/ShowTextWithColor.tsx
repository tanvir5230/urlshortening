import React from "react";
import Paper from "@mui/material/Paper";
interface ShowTextWithColorProps {
  text: string;
  color: string;
}
const ShowTextWithColor: React.FC<ShowTextWithColorProps> = ({
  text,
  color,
}) => {
  return (
    <Paper
      variant={"elevation"}
      elevation={3}
      style={{
        backgroundColor: "white",
        borderRadius: "10px",
        color: color,
        padding: "17px",
      }}
    >
      {text}
    </Paper>
  );
};

export default ShowTextWithColor;
