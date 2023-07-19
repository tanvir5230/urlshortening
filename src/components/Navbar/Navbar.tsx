import React, { Dispatch, SetStateAction } from "react";
import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
import AddCircleOutlinedIcon from "@mui/icons-material/AddCircleOutlined";
import ChecklistOutlinedIcon from "@mui/icons-material/ChecklistOutlined";

interface NavbarProps {
  currentPage: string;
  setCurrentPage: Dispatch<SetStateAction<string>>;
}

const Navbar: React.FC<NavbarProps> = ({ currentPage, setCurrentPage }) => {
  return (
    <nav
      style={{
        border: "2px solid #ccc",
        minWidth: "200px",
        maxWidth: "200px",
        borderRadius: "10px",
        padding: "10px",
      }}
    >
      <BottomNavigation
        showLabels
        value={currentPage}
        onChange={(event, newValue) => {
          setCurrentPage(newValue);
        }}
      >
        <BottomNavigationAction label="Edit" icon={<ModeEditOutlinedIcon />} />
        <BottomNavigationAction
          label="Enter"
          icon={<AddCircleOutlinedIcon />}
        />
        <BottomNavigationAction label="List" icon={<ChecklistOutlinedIcon />} />
      </BottomNavigation>
    </nav>
  );
};

export default Navbar;
