import React from "react";
import Button from "@mui/material/Button/Button";

interface EntryButtonProps {
  color: string;
  text: string;
  marginTop: string;
}

const EntryButton: React.FC<EntryButtonProps> = ({
  color,
  text,
  marginTop,
}) => {
  return (
    <Button
      fullWidth
      variant="contained"
      style={{
        borderRadius: "10px",
        marginTop: marginTop,
        padding: "15px 0",
        backgroundColor: color,
        color: "black",
        fontWeight: "bold",
      }}
    >
      {text}
    </Button>
  );
};
export default EntryButton;
