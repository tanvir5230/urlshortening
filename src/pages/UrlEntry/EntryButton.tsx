import React from "react";
import Button from "@mui/material/Button/Button";

interface EntryButtonProps {
  color: string;
  text: string;
  marginTop: string;
  disabled?: boolean;
  funcToExecute?: Function;
}

const EntryButton: React.FC<EntryButtonProps> = ({
  color,
  text,
  marginTop,
  disabled,
  funcToExecute,
}) => {
  return (
    <Button
      fullWidth
      variant="contained"
      disabled={disabled === undefined || disabled === false ? false : true}
      onClick={() => {
        funcToExecute && funcToExecute();
      }}
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
